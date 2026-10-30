const express = require('express');
const sequelize = require('./config/database');
const Student = require('./models/Student');

const app = express();

app.use(express.json());

// Get all students
app.get('/students', async (req, res) => {
    const students = await Student.findAll();
    res.json(students);
});

// Create a student
app.post('/students', async (req, res) => {
    const { name, email } = req.body || {};

    if (typeof name !== 'string' || !name.trim() ||
        typeof email !== 'string' || !email.trim()) {
        return res.status(400).json({
            message: 'Send name and email as non-empty strings in Body → JSON.'
        });
    }

    try {
        const student = await Student.create({
            name: name.trim(),
            email: email.trim()
        });
        return res.status(201).json(student);
    } catch (error) {
        console.error('Error creating student:', error);
        return res.status(500).json({ message: 'Could not create student.' });
    }
});

// Get one student by ID
app.get('/students/:id', async (req, res) => {
    const student = await Student.findOne({
        where: { id: req.params.id }
    });

    if (!student) {
        return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
});


async function start() {
    try {
        await sequelize.sync();

        app.listen(3005, () => {
            console.log('I am running on port 3005');
        });
    } catch (error) {
        console.log('Error:', error);
    }
}

start();