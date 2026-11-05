const express = require('express');
const sequilize = require('./config/database');
const Student = require('./models/student');
const studentRouter = require('./routers/studentRouter');
const app = express();

app.use(express.json());
app.use('/api', studentRouter);





//start the app
async function start() {
    try {
        sequilize.sync();
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
}
start();




