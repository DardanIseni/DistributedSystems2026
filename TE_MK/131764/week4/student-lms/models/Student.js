// Import DataTypes from Sequelize to define column data types
const { DataTypes } = require('sequelize');

// Import Sequelize connection to SQLite database
const sequelize = require('../config/database');

// Define Student model (represents a table in the database)
//we are defining a new table Student with the following collumns
const Student = sequelize.define('Student', {

    // Student name column
    name: {
        type: DataTypes.STRING, // Stores text (string)
        allowNull: false       // Name is required (cannot be NULL)
    },

    // Student email column
    email: {
        type: DataTypes.STRING, // Stores text (string)
        allowNull: false       // Email is required (cannot be NULL)
    }
});

// Export Student model so it can be used in other files
module.exports = Student;