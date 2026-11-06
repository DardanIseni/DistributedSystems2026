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
app.get('/students/:id', async (req, res) => {
    const id = req.params.id;
    const student = await Student.findByPk(id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json(student);
});



//create student

app.post('/student', async(req,res) => {
    
    const student = await Student.create(req.body);
    res.json(student)
})

//Update a student
app.put('/students/:id', async (req, res) => {
    const id = req.params.id;
    const student = await Student.findByPk(id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    await student.update(req.body);
    res.json(student);
});


 //Delete a student
app.delete('/students/:id', async (req, res) => {
    const id = req.params.id;
    const student = await Student.findByPk(id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    await student.destroy();

    res.json({
        message: "Student deleted successfully"
    });
});



 //start the app
async function start() {
    try {
        await sequlize.sync();

        app.listen(3000, () => {
            console.log("Running on port 3000");
        });
    } catch (error) {
        console.log("Error: " + error);
    }
}

start();
