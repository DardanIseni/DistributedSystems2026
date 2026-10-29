const express = require('express');
const sequelize = require('./config/database');
const Student = require('./models/Student');

const app = express();

app.use(express.json());

//GET ALL STUDENTS
app.get('/students', async (req, res) => {

const student = await Student.findAll();
res.json(student);

})

//GET student by id if there is no student with that id return 404
app.get('/students/:id', async (req, res) => {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
        return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
});

//create student

app.post('/students', async (req, res) => {


const student = await Student.create(req.body);
res.json(student);



})


//start the app
 function start(){
    try{
         sequelize.sync();
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    } catch (error) {
        console.error('Error starting the server:', error);
    }
}
start();