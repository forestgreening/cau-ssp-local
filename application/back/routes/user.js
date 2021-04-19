const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const path = require('path');
const fs = require('fs');
const { FileSystemWallet, Gateway } = require('fabric-network');

const ccpPath = path.resolve(__dirname, '..', '..', '..', 'network', 'connection.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);
const { User } = require('../models');
const { loggedIn, notLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const user = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['password'],
        },
      });
      res.status(200).json(user);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/login', notLoggedIn, (req, res, next) => {
  try {
    passport.authenticate('local', (serverErr, user, clientErr) => {
      if (serverErr) {
        console.error(serverErr);
        return next(serverErr);
      }
      if (clientErr) {
        return res.status(401).send(clientErr.message);
      }
      return req.login(user, async (loginErr) => {
        if (loginErr) {
          console.error(loginErr);
          return next(loginErr);
        }
        const userWithoutPassword = await User.findOne({
          where: { id: user.id },
          attributes: {
            exclude: ['password'],
          },
        });
        return res.status(200).json(userWithoutPassword);
      });
    })(req, res, next);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('ok');
});

router.post('/signup', notLoggedIn, async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        loginId: req.body.loginId,
      },
    });
    if (exUser) {
      return res.status(403).send('이미 사용 중인 아이디입니다.');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      loginId: req.body.loginId,
      name: req.body.name,
      email: req.body.email,
      workIn: req.body.workIn,
      workInDetail: req.body.workInDetail,
      field: req.body.field,
      project: req.body.project,
      password: hashedPassword,
    });
    const userWithoutPassword = await User.findOne({
      where: { loginId: req.body.loginId },
      attributes: {
        exclude: ['password'],
      },
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
      discovery: {
        enabled: false,
      },
    });
    const network = await gateway.getNetwork('ssp');
    const contract = network.getContract('ssp');
    await contract.submitTransaction('addUser', req.body.loginId, req.body.name);
    console.log('Transaction has been submitted');
    await gateway.disconnect();
    return res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
