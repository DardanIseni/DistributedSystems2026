const express = require('express');
const sequelize = require('./config/database');
const Student = require('./models/Student');
const app = express();

app.use(express.json());

//Get all students
app.get('/students', async (req, res) => {
    const students = await Student.findAll()
    res.json(students)
})

//Get student by id
app.get('/student/:id', async (req, res) => {
    const id = req.params.id;
    const student = await Student.findByPk(id);

    //if there is no student
    if (!student) {
        return res.status(404).json({ message: 'Student not found' });
    }

    //if there is a student
    res.status(200).json(student);
})

//create student
app.post('/student', async (req, res) => {
    
    const student =await Student.create (req.body);
    res.json(student)
    
})


//start the app
function start(){
    try{
        sequelize.sync();
        app.listen(3000, () => {
            console.log('Server is running on port 3000');

    })
}
    catch{
        console.log("Error")
    }
}
start();