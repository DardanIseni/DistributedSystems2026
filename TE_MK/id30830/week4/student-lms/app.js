const express=require('express');
const sequlize=require('./config/database')
const Student=require('./models/Student')
const app= express();


app.use(express.json());

//get all students

app.get('/students',async (req,res)=>{

    const students= await Student.findAll ()
res.json(students);

})

//get student by id 
app.get('/students/:id', async (req, res) => {
    const id=req.params.id;
    const student = await Student.findByPk(req.params.id);
//there is no student  
    if (!student) {
        return res.status(404).json({ message: "Student does not exist" });
    }

    //if there is a student 
    res.json(student);
});



//create student

app.post('/student', async(req,res)=>{

    const student=await Student.create(req.body);
    res.json(student)
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
