const express = require('express');
const path = require('path');
const fs = require('fs');
const { FileSystemWallet, Gateway } = require('fabric-network');

const ccpPath = path.resolve(__dirname, '..', '..', '..', 'network', 'connection.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);
const { MaterialOrder, MaterialRental } = require('../models');

const router = express.Router();


router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const material = await MaterialRental.findAll({
        limit: 1,
        order: [['createdAt', 'DESC']]
      });
      res.status(200).json(material);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/readed', async (req, res, next) => {
  try {
    if (req.user) {
      const material = await MaterialRental.findAll({
        where: { isReaded: false }
      });
      if (material !== []) {
        console.log(material);
        res.status(200).json(material);
      } else {
        console.log(material);
        res.status(200).send(null);
      }
    } else {
      console.log("abc");
      res.status(200).send(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch('/update', async (req, res, next) => {
  try {
    await MaterialRental.update({
      isReaded: true,
    }, {
        where: { isReaded: false },
      });
    res.status(200).send(null);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/order', async (req, res, next) => {
  try {
    const material = await MaterialOrder.create({
      fileName: req.body.fileName,
      contractQuantity: req.body.contract,
      companyName: req.body.orderingCompany,
      quantity: req.body.order,
      date: req.body.date,
    });
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
    await contract.submitTransaction('addMaterial', req.body.fileName, req.body.contract, req.body.orderingCompany, req.body.order, req.body.date);
    console.log('Transaction has been submitted');
    await gateway.disconnect();
    res.status(201).json(material);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/rental', async (req, res, next) => {
  try {

    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = new FileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);
    const userExists = await wallet.exists('user1');
    if (!userExists) {
      console.log('An identity for the user "user1" does not exist in the wallet');
      console.log('Run the registerUser.js application before retrying');
      return;
    }
    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: false } });
    const network = await gateway.getNetwork('ssp');
    const contract = network.getContract('ssp');
    const result = await contract.evaluateTransaction('getMaterial', req.body.fileName);
    console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

    var obj = JSON.parse(result);

    const match = await obj.quantity === req.body.rental ? "일치" : "불일치";

    await contract.submitTransaction('addMaterialRental', req.body.fileName, req.body.contract, req.body.rentalCompany, req.body.rental, req.body.date, match);
    console.log('Transaction has been submitted');
    await gateway.disconnect();
    const material = await MaterialRental.create({
      fileName: req.body.fileName,
      contractQuantity: req.body.contract,
      companyName: req.body.rentalCompany,
      quantity: req.body.rental,
      date: req.body.date,
      isReaded: false,
      match
    });
    res.status(201).json(material);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
