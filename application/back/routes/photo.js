const express = require('express');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const { FileSystemWallet, Gateway } = require('fabric-network');

const ccpPath = path.resolve(__dirname, '..', '..', '..', 'network', 'connection.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

const { Photo } = require('../models');

const router = express.Router();

router.get('/loadPhotos', async (req, res, next) => {
  try {
    const photos = await Photo.findAll({});
    res.status(200).json(photos);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/upload', async (req, res, next) => {
  const time = new Date();
  const fileName = req.body.creator + time;

  const base64Data = req.body.imageSrc.replace(/^data:image\/jpeg;base64,/, '');
  fs.writeFileSync(`upload/${fileName}.jpeg`, base64Data, 'base64', (err) => {
    console.log(err);
  });

  const buffer = fs.readFileSync(`upload/${fileName}.jpeg`);
  const sum = crypto.createHash('sha256');
  sum.update(buffer);
  const hash = sum.digest('hex');

  try {
    const photo = await Photo.create({
      imageUrl: req.body.imageSrc,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      creator: req.body.creator,
      hash,
      fileName,
    });
    console.log(photo);

    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = new FileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    const userExists = await wallet.exists('user1');
    if (!userExists) {
      console.log(
        'An identity for the user "user1" does not exist in the wallet',
      );
      console.log('Run the registerUser.js application before retrying');
      return;
    }
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: 'user1',
      discovery: { enabled: false },
    });
    const network = await gateway.getNetwork('ssp');
    const contract = network.getContract('ssp');
    await contract.submitTransaction('addPhoto', req.body.imageSrc, hash);
    console.log('Transaction has been submitted');
    await gateway.disconnect();

    res.status(201).json(photo);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
