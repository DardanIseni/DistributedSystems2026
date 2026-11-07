
const express = require('express');
const sequelize = require('./config/database');
const Student = require('./models/student');
const app = express();

app.use(express.json());

// Get all students
app.get('/students', async (req, res) => {
    const students = await Student.findAll();
    res.json(students);
});

// Get student by ID
app.get('/students/:id', async (req, res) => {
    const id = req.params.id;
    const student = await Student.findByPk(id);

    if (!student) {
        return res.status(404).send('Student not found');
    }

    res.status(200).json(student);
});

// Create student
app.post('/student', async (req, res) => {
    const student = await Student.create(req.body);
    res.status(201).json(student);
});

// Update student
app.put('/students/:id', async (req, res) => {
    const id = req.params.id;
    const student = await Student.findByPk(id);

    if (!student) {
        return res.status(404).send('Student not found');
    }

    await student.update(req.body);
    res.status(200).json(student);
});

// Delete student
app.delete('/students/:id', async (req, res) => {
    const id = req.params.id;
    const student = await Student.findByPk(id);

    if (!student) {
        return res.status(404).send('Student not found');
    }

    await student.destroy();
    res.status(200).json({ message: 'Student deleted successfully' });
});

// Start the app
async function start() {
    try {
        await sequelize.sync();
        app.listen(3000, () => {
            console.log('Server is up');
        });
    } catch (error) {
        console.log('Error:', error);
    }
}

start();
