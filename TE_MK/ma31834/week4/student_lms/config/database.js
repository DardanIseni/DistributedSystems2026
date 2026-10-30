const { Sequelize } = require('sequelize');
// Import the Sequelize class from the sequelize package.
// Sequelize is an ORM that lets us work with databases using JavaScript.

const sequelize = new Sequelize({
    // Create a new Sequelize instance to configure the database.

    dialect: 'sqlite',
    // Specify SQLite as the database type.

    storage: './students.sqlite',
    // Specify the database file where the data will be stored.
    // SQLite creates the file if it does not exist.

    logging: false
    // Disable SQL queries from being printed in the terminal.
});

module.exports = sequelize;
// Export the database instance so other files can use it.
