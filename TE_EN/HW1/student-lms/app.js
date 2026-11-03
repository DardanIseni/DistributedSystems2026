
const express = require('express');
const sequelize = require('./config/database');
const Student = require('./models/Student');

const app = express();

app.use(express.json());

// GET - All students
app.get('/students', async (req, res) => {
    const students = await Student.findAll();
    res.json(students);
});

// POST - Create a student
app.post('/student', async (req, res) => {
    const student = await Student.create(req.body);
    res.status(201).json(student);
});

// GET - Student by ID
app.get('/students/:id', async (req, res) => {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
});

// PUT - Update a student
app.put('/students/:id', async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        await student.update(req.body);
        res.json(student);

    } catch (error) {
        res.status(500).json({ message: "Error updating student" });
    }
});

// DELETE - Delete a student
app.delete('/students/:id', async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        await student.destroy();
        res.json({ message: "Student deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error deleting student" });
    }
});

// Start server
async function start() {
    try {
        await sequelize.sync();

        app.listen(3005, () => {
            console.log("I am running on port 3005");
        });
    } catch (error) {
        console.log("Error", error);
    }
}

start();
