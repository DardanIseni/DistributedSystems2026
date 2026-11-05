const express = require('express');
const sequelize = require('./config/database');
const studentRouter = require('./rounters/studentRounter');
const app = express();
app.use(express.json());
app.use('/api', studentRouter);
//start the app
async function start() {
    try {
        await sequelize.sync();
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
}
start();