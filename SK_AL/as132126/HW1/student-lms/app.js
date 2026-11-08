const express = require('express');
const sequelize = require('./config/database');
const Student = require('./models/Student');

const app = express();
app.use(express.json());

// Read - get all students
app.get('/students', async (req, res) => {
    try {
        const students = await Student.findAll();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching students', error: error.message });
    }
});

// Read - get a student by id
app.get('/students/:id', async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching student', error: error.message });
    }
});

// Create - add a new student
app.post('/student', async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ message: 'Error creating student', error: error.message });
    }
});

// Update - update an existing student by id
app.put('/students/:id', async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        const { name, email } = req.body;
        await student.update({ name, email });
        res.json(student);
    } catch (error) {
        res.status(400).json({ message: 'Error updating student', error: error.message });
    }
});

// Delete - remove a student by id
app.delete('/students/:id', async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        await student.destroy();
        res.json({ message: `Student with id ${req.params.id} deleted successfully` });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting student', error: error.message });
    }
});

async function start() {
    try {
        await sequelize.sync();
        app.listen(3000, () => {
            console.log('Running on http://localhost:3000');
        });
    } catch (error) {
        console.log('Error: ' + error);
    }
}

start();
