const express = require('express');
const sequlize = require('./config/database')
const Student = require('./models/Student')
const app = express();

app.use(express.json());

//Get All Students

app.get('/students', async (req,res) => {
    const students = await Student.findAll();
    res.json(students);
})

//Get Student by id


app.get("/student/:id", async (req,res) => {
    const id = req.params.id;
    const student = await Student.findByPk(id);
    //if there is no student
    if(!student){
        res.status(404).json({message: "Student not found"});
    }

    else
        res.status(200).send(student);
    //if there is a student
})


//create student

app.post('/student', async(req,res) => {
    
    const student = await Student.create(req.body);
    res.json(student)
})


function start(){
    try{
        sequlize.sync();
        app.listen(3000,()=>{
            console.log("Running on port 3000")
        })
    }
    catch{
        console.log("Error")
    }
}
start();