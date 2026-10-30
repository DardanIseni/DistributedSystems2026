const express = require('express');
const sequileze = require('./config/database');
const Student = require('./models/Student');

const app = express();

app.use(express.json());

//GET
app.get('/students',async (req,res) => {
    const students = await Student.findAll();

    res.json(students);
})

//Create
app.post('/students',async (req,res) => {
   const student = await Student.create(req.body);
   res.json(student);
})

//GetById
function start(){
    try{
        sequileze.sync();
            app.listen(3000,() => {
                console.log('Server is running on port 3000');
            })
        }
    catch{
        consol.log("Errror");

    }

}
//GetById - lab
//if there is no student with that id
//respond with error
//otherwise return the object
async function one(req, res) {
    await sequelize.sync();

    const student = await Student.findByPk(req.params.id);

    if (!student) {
        return res.status(404).json({ error: 'Student not found' });
    } else {
        return res.json(student);
    }
}
start();
one();
