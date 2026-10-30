const express = require('express');
const sequelize = require('./config/database');
const Student = require('./models/Student');

const app = express();
app.use(express.json());

// Get the Students

app.get('/students', async (req, res) => {
    const students = await Student.findAll();
    res.json(students);
});


// Create Student
app.post('/student', async (req, res) => {
    const student = await Student.create(req.body);
    res.json(student);
});


// Get one Student by ID
// if there is no student with the given ID, return a 404 error otherwise return the object
 
app.get('/student/:id', async (req, res) => {
    const id = req.params.id;
    const student = await Student.findByPk(id);

   if(!student){
        res.json("error - no student with that id").status(400)
    }
    res.json(student)
    //if there is a student
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
start()