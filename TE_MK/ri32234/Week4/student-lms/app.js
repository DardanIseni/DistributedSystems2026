const express=require('express');
const sequelize=require('./config/database');
const Student=require('./models/Student');
const app=express();

app.use(express.json());

//Get All Students

app.get('/students',async(req,res)=>{
    const students = await Student.findAll();
    res.json(students);
})

//Get Student by id

app.get('/students/{id}',async(req,res) => {
   //extract the id
   const id=req.params.id;
    const student = Student.findByPk(id);

    // If there is no student
    if (!student) {
        return res.status(404).json({ message: 'Student not found' });
    }

    // If there is a student
    res.status(200).json(student);
})

//Create Student 
app.post('/student',async(req,res)=>{
    const student=await Student.create(req.body);
    res.json(student)
})
//Start the app
function start(){
    try{
        sequelize.sync();
        app.listen(3000,()=>{
            console.log("Running on port 3000")
        })
    }
    catch{
        console.log("Error")
    }
}
start()

