const express = require('express');
const sequelize = require('./config/database');
const Student = require('./models/Student');
const app = express();

app.use(express.json());

//get all students 

app.get('/students' , async (req,res) => {
    const students = await Student.findAll();
    res.json(students);
})
//get studnts by id

//create student

app.get('/student/:id', async (req,res) =>  {

    const id = req.params.id;
    const student = await Student.findByPk(id);
     // if there is no studnet

   if(!student){
        res.status(404).send({message: 'Student not found'});
   }

        else  
            res.status(200).send(student);
        
    })

    //if there is a studneet




app.post('/student', async (req,res) => {
      
      const student =  await Student.create(req.body);
      res.json(student)
})

//staart app

function start(){
    try{ 
        sequelize.sync ();
        app.listen(3000, () =>{
        console.log('Server is running on port 3000');

    })
}
    catch {
        console.log ("error");
    }
}
start();

