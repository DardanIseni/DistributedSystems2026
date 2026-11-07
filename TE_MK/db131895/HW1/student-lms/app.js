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
app.get("/students/:id",async (req,res)=> {
    //extract the id ->
    const id = req.params.id;
    const student = await Student.findByPk(id);
    //if there is no student
    if(!student){
         return res.status(404).json("error - no student with that id")
    }
    res.json(student)
    //if there is a student
})


//create student

app.post('/student', async(req,res) => {
    
    const student = await Student.create(req.body);
    res.json(student)
})

app.put("/students/:id",async (req,res)=> {
    const id = req.params.id;
    const student = await Student.findByPk(id);

    if(!student){
        return res.status(404).json("error - no student with that id")
    }

    await student.update(req.body, { fields: ["name", "email"] })
    res.json(student)
})

app.delete("/students/:id",async (req,res)=> {
    const id = req.params.id;
    const student = await Student.findByPk(id);

    if(!student){
        return res.status(404).json("error - no student with that id")
    }

    await student.destroy()
    res.json("Student deleted")
})


//start the app
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