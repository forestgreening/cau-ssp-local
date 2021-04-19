const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');

// const { createProxyMiddleware } = require('http-proxy-middleware');
const userRouter = require('./routes/user');
const materialRouter = require('./routes/material');
const photoRouter = require('./routes/photo');
const db = require('./models');
const passportConfig = require('./passport');

dotenv.config();

const app = express();

db.sequelize.sync({ force: false })
  .then(() => {
    console.log('db connection success');
  })
  .catch(console.error);

passportConfig();

app.use(cors({
  origin: ['http://localhost:3000', 'http://192.168.0.5:3000', 'https://394e2af4d0dd.jp.ngrok.io', '1.231.209.103', '192.168.0.0'],
  credentials: true,
}));

// app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECRET));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/user', userRouter);
app.use('/material', materialRouter);
app.use('/photo', photoRouter);

app.listen(80, () => {
  console.log('서버 실행 중');
});
