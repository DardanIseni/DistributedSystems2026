const express = require('express');
const sequelize = require('./config/database');
const studentRouter = require('./routers/studentRouter');

const app = express();

app.use(express.json());

app.use('/student', studentRouter);

async function start() {
    try {
        await sequelize.sync();

        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });

    } catch (error) {
        console.log('Error starting server:', error);
    }
}

start();