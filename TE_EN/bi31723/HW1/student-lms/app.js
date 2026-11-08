const express = require('express');
const {ValidationError} = require('sequelize')
const sequelize = require('./config/database')
const Student = require('./models/Student')

const app = express();
app.use(express.json())

// Read - operation
app.get('/students', async(req, res) => {
   
    const students = await Student.findAll();
    res.json(students);
})

app.get('/students/:id', async(req, res) => {
    const student = await Student.findByPk(req.params.id);
    res.json(student);
})

//Create - Post student
app.post('/students', async(req,res) => {
    const student = await Student.create(req.body)
    res.json(student);
})

//Update - Put student
app.put('/students/:id', async(req,res) => {
    const student = await Student.findByPk(req.params.id);

    if(!student){
        return res.status(404).json({message: "Student not found"});
    }
    try{
        await student.update(req.body ?? {}, {fields: ['name','email']});
    }
    catch (error){
        if(error instanceof ValidationError){
            return res.status(400).json({message: error.message});
        }
        throw error;
    }
    res.json(student);
})

//Delete - Delete student
app.delete('/students/:id', async(req,res) => {
    const student = await Student.findByPk(req.params.id);

    if(!student){
        return res.status(404).json({message: "Student not found"});
    }

    await student.destroy();
    res.json({message: "Student deleted successfully"});
})

async function start(){
    try{
        await sequelize.sync();
        app.listen(3000,()=> {
            console.log("Running...")
        })
    }
    catch (error){
        console.log("Error: " + error )
    }
}

start()