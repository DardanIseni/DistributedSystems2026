const path = require('node:path');
const { Sequelize } = require('sequelize');

module.exports = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.SQLITE_STORAGE || path.join(__dirname, '..', 'students.sqlite'),
  logging: false,
});
