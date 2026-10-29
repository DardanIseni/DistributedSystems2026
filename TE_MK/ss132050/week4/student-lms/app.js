const express = require('express');
const sequelize = require('./config/database');
const Student = require('./models/student');
const app = express();


app.use(express.json());

//Get All students

app.get('/students', async (req, res) => {
    const students = await Student.findAll();
    res.json(students);
})
//Get student by id


function start(){
    try{
        sequelize.sync();
        app.listen(3000, () =>{
            console.log("Server is up");
        })

    }
    catch {
        console.log("Error")
    }
}
//Create student
app.post('/student', async (req, res) => {
    const student = await Student.create(req.body)
    res.json(student).status(200)
})
//get one student
app.get('/students/:id', async (req, res) => {
const studedentbyid = req.params.id;
const id = req.params.id;
const student = await Student.findByPk(id)
    if (!student) {
        res.status(404).send('Student not found')

    }
    else
        res.status(200).send(student);
})

//start the app
start();