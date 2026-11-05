const express = require('express');
const sequelize = require('./config/database')
const Student = require('./models/Student')

const app = express();
app.use(express.json())

//Create - Post student
app.post('/student', async(req,res) => {
    const student = await Student.create(req.body)
    res.json(student);
})



// Read - operation
app.get('/students',async(req,res) => {
   
    const students = await Student.findAll();
    res.json(students);
})

app.get('/students/:id',async(req,res) => {
   
    const student = await Student.findByPk(req.params.id);
        if (!student) {
            return res.status(404).json({message: "Student not found!"})
        }
    res.json(student);
})


//Update - PUT student
app.put('/students/:id', async (req, res) => {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
        return res.status(404).json({ message: "Studenti nuk ekziston" });
    }
    await student.update(req.body);
    res.json(student);
})

//Delete - DELETE student
app.delete('/students/:id', async (req, res) => {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
        return res.status(404).json({ message: "Studenti not found!" });
    }
    await student.destroy();
    res.json({ message: "Studenti u fshi" });
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