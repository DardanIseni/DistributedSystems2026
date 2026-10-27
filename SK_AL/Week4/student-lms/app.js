const express = require('express');
const sequelize = require('./config/database')
const Student = require('./models/Student')

const app = express();
app.use(express.json())

// Read - operation
app.get('/students',async(req,res) => {
   
    const students = await Student.findAll();
    res.json(students);
})

app.get('/students/{id}',async(req,res) => {
   
    const student = Student.findByPk(req.params.id);
    res.json(student);
})

//Create - Post student
app.post('/student', async(req,res) => {
    const student = await Student.create(req.body)
    res.json(student);
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