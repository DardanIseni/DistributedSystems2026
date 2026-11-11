const express = require('express');
const sequelize = require('./config/database');
const app = express();
const StudentRouter = require('./routers/studentRouter')

// Allows us to receive JSON data from requests
app.use(express.json());
app.use('/', StudentRouter)



// Start our application
async function start() {
    try {

        // Connect to the database and create tables if needed
        await sequelize.sync();

        // Run the server on port 3000
        app.listen(3000, () => {
            console.log("Running on server 3000...");
        });

    } catch (error) {

        // Show an error if the database can't start
        console.log("Error: " + error);
    }
}


// Start the server
start();