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


//Get student by id
app.get("/students/:id", async (req,res)=> {
    //extract the id
    const id = req.params.id;
    const student = await Student.findByPk(id);
    //if there is no student
    if(!student){
        return res.status(404).json({ error: "no student with that id" });
    }
    //if there is a student
    res.json(student)
})


//create student
app.post('/student', async(req,res) => {
    const student = await Student.create(req.body);
    res.status(201).json(student)
})


//update student (Task A)
app.put('/students/:id', async (req,res) => {
    const id = req.params.id;
    const student = await Student.findByPk(id);
    if(!student){
        return res.status(404).json({ error: "no student with that id" });
    }
    await student.update(req.body);
    res.json(student);
})


//delete student (Task B)
app.delete('/students/:id', async (req,res) => {
    const id = req.params.id;
    const student = await Student.findByPk(id);
    if(!student){
        return res.status(404).json({ error: "no student with that id" });
    }
    await student.destroy();
    res.json({ message: "Student deleted successfully" });
})


//start the app
async function start(){
    try{
        await sequlize.sync();
        app.listen(3000,()=>{
            console.log("Running on port 3000")
        })
    }
    catch(err){
        console.log("Error", err)
    }
}
start()

