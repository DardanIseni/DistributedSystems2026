const express = require('express');
const sequelize = require('./config/database');
const Student = require('./models/Student');

const app = express();
app.use(express.json());

// Get the Students
app.get('/students', async (req, res) => {
    const students = await Student.findAll();
    res.json(students);
});


// Create Student
app.post('/student', async (req, res) => {
    const student = await Student.create(req.body);
    res.json(student);
});


// Get Student by ID
app.get('/students/:id', async (req, res) => {
    const id = req.params.id;
    const student = await Student.findByPk(id);

    if (!student) {
        return res.status(404).json("error - no student with that id");
    }
    res.json(student);
});

// Update Student
app.put('/students/:id', async (req, res) => {
    const id = req.params.id;
    const student = await Student.findByPk(id);

    if (!student) {
        return res.status(404).json("error - no student with that id");
    }
    await student.update(req.body);
    res.json(student);
});


// Delete Student
app.delete('/students/:id', async (req, res) => {
    const id = req.params.id;
    const student = await Student.findByPk(id);

    if (!student) {
        return res.status(404).json("error - no student with that id");
    }
    await student.destroy();
    res.json("student deleted");
});


function start() {
    try {
        sequelize.sync();
        app.listen(3000, () => {
            console.log("Running on port 3000")
        })
    }
    catch (err) {
        console.log("Error");
    }
}
start()