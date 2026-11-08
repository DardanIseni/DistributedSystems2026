
const express = require('express');
const sequelize = require('./config/database');
const Student = require('./models/Student');

const app = express();

app.use(express.json());

// GET - Retrieve all students
app.get('/students', async (req, res) => {
    const students = await Student.findAll();
    res.json(students);
});

// GET - Retrieve student by ID
app.get('/students/:id', async (req, res) => {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json(student);
});

// POST - Create a new student
app.post('/student', async (req, res) => {
    const student = await Student.create(req.body);
    res.status(201).json(student);
});

// PUT - Update an existing student
app.put('/students/:id', async (req, res) => {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    await student.update(req.body);

    res.json(student);
});

// DELETE - Delete a student
app.delete('/students/:id', async (req, res) => {
    const student = await Student.findByPk(req.params.id);

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

// Start the application
async function start() {
    try {
        await sequelize.sync();

        app.listen(3000, () => {
            console.log("Running...");
        });
    }
    catch (error) {
        console.log("Error: " + error);
    }
}

start();
