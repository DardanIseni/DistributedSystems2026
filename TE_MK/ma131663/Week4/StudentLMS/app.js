const express = require ('express');
const sequelize = require('./config/database');
const Student = require('./models/Student')
const app = express();

app.use(express.json());

app.get('/students', async (req,res)=>{
    const students = await Student.findAll();
    res.json(students);
})

app.post('/students', async (req,res)=>{
    
    const student = await Student.create(req.body);
    res.json(student);

})


function start(){
    try{
        sequelize.sync();    
        app.listen(3001,()=>{
            console.log('Running on port 3001');
        })
    }
    catch{
        console.log('Error');
    }    
} start();