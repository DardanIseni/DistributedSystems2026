const path = require('node:path');
const { Sequelize } = require('sequelize');

// Resolve storage relative to this project, regardless of the working directory.
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_STORAGE || path.join(__dirname, '..', 'students.sqlite'),
  logging: false,
});

module.exports = sequelize;
