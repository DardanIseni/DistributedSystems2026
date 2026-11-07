const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// The name and email fields follow the TE_EN/Week4/student-lms starter.
const Student = sequelize.define('Student', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true, isEmail: true },
  },
});

module.exports = Student;
