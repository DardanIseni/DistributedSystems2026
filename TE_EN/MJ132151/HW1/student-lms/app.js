const express = require('express');
const sequelize = require('./config/database')
const Student = require('./models/Student')

const app = express();

app.use(express.json());

//Get all students
app.get('/students', async (req,res) => {
    const students = await Student.findAll();
    res.json(students);
})

//Get student by id
app.get('/students/:id', async (req,res) => {
    const student = await Student.findByPk(req.params.id);
    if(!student){
        return res.status(404).json("error - no student with that id")
    }
    res.json(student)
})

//Create
app.post('/student', async (req,res) => {
    const student = await Student.create(req.body);
    res.json(student);
})

//Update
app.put('/students/:id', async (req,res) => {
    const student = await Student.findByPk(req.params.id);
    if(!student){
        return res.status(404).json("error - no student with that id")
    }
    await student.update(req.body);
    res.json(student);
})

//Delete
app.delete('/students/:id', async (req,res) => {
    const student = await Student.findByPk(req.params.id);
    if(!student){
        return res.status(404).json("error - no student with that id")
    }
    await student.destroy();
    res.json("student deleted");
})

function start(){
    try{
        sequelize.sync();
        app.listen(3005,()=> {
            console.log("I am running on port 3005")
        })
    }
    catch{
        console.log("Error")
    }
}

start()