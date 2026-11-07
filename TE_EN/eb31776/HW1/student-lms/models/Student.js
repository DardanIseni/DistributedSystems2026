const { DataTypes } = require('sequelize')
const db = require('../config/database')

const Student = db.define('Student', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true }
    },
    age: {
        type: DataTypes.INTEGER,
        validate: { min: 16 }
    }
})

Student.editable = ['name', 'email', 'age']

module.exports = Student
