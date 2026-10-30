const express = require('express');
const sequlize = require('./config/database')
const Student = require('./models/student')
const app = express();

app.use(express.json());


app.get('/students', async (req,res) => {
    const students = await Student.findAll();
    res.json(students);
})

app.get("/student/:id",async (req,res)=> {
    const id = req.params.id;
    const student = Student.findByPk(id);
    if(!student){
        res.json("error - no student with that id").status(400)
    }
    res.json(student)

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
start()