const { DataTypes } = require("sequelize");
// Import DataTypes to define the types of the model's fields.

const sequelize = require('../config/database');
// Import the configured database instance.

const Student = sequelize.define('Student', {
    // Define the Student model, which represents a database table.

    name: {
        // Define the name field.

        type: DataTypes.STRING,
        // Store the student's name as a string.

        allowNull: false
        // The name field cannot be NULL.
    },

    email: {
        // Define the email field.

        type: DataTypes.STRING,
        // Store the student's email as a string.

        allowNull: false
        // The email field cannot be NULL.
    }
});

module.exports = Student;
// Export the Student model so other files can use it.
