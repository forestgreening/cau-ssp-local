const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const passport = require('passport');
const dotenv = require('dotenv');
const hpp = require('hpp');
const helmet = require('helmet');

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

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
  app.use(hpp());
  app.use(helmet());
} else {
  app.use(morgan('dev'));
}

app.use(cors({
  origin: ['http://52.78.123.238'],
  credentials: true,
}));

app.options('/', cors());

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
