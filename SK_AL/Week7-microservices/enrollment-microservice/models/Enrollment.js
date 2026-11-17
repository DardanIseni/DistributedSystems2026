const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Enrollment = sequelize.define('Enrollment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    studentId: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull:false

    },

    
});

module.exports = Enrollment;