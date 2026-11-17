const express = require('express');
const sequelize = require('./config/database');
const courseRouter = require('./routers/courseRouter');

const app = express();

app.use(express.json());

app.use('/', courseRouter);

async function start() {
    try {
        await sequelize.sync();

        app.listen(3002, () => {
            console.log('Course Service running on port 3002');
        });
    } catch (error) {
        console.error('Database connection error:', error);
    }
}

start();