const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: 'cau',
    password: process.env.DB_PASSWORD,
    database: 'cau-ssp',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: 'cau',
    password: process.env.DB_PASSWORD,
    database: 'cau-ssp',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'cau',
    password: process.env.DB_PASSWORD,
    database: 'cau-ssp',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
