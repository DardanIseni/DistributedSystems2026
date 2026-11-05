const express = require('express');
const sequelize = require('./config/database');
const app = express();
const studentRouter = require('./routers/studentRouter');

app.use(express.json());
app.use(studentRouter);

async function start() {
    try {
        await sequelize.sync();

        app.listen(3000, () => {
            console.log("Server is up");
        });
    } catch (error) {
        console.log("Error:", error);
    }
}

start();
