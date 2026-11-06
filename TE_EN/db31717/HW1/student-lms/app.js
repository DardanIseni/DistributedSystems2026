const express = require('express');
const sequelize = require('./config/database');
const Student = require('./models/Student');

const app = express();
app.use(express.json());

// check the id and find the student
app.param('id', async (req, res, next, id) => {
    if (!/^[1-9]\d*$/.test(id) || !Number.isSafeInteger(Number(id))) {
        return res.status(400).json({ message: 'Invalid student id' });
    }
    const student = await Student.findByPk(id);
    if (!student) {
        return res.status(404).json({ message: 'Student not found' });
    }
    req.student = student;
    next();
});

function validateStudent(req, res, next) {
    const { name, email } = req.body || {};
    if (typeof name !== 'string' || !name.trim() ||
        typeof email !== 'string' || !email.trim()) {
        return res.status(400).json({ message: 'Name and email are required' });
    }
    req.studentData = { name: name.trim(), email: email.trim() };
    next();
}

// get all students
app.get('/students', async (req, res) => {
    const students = await Student.findAll();
    res.json(students);
});

// get one student
app.get('/students/:id', (req, res) => {
    res.json(req.student);
});

// create a student
app.post('/student', validateStudent, async (req, res) => {
    const student = await Student.create(req.studentData);
    res.status(201).json(student);
});

// update a student
app.put('/students/:id', validateStudent, async (req, res) => {
    await req.student.update(req.studentData);
    res.json(req.student);
});

// delete a student
app.delete('/students/:id', async (req, res) => {
    await req.student.destroy();
    res.json({ message: 'Student deleted successfully' });
});

app.use((error, req, res, next) => {
    if (error.type === 'entity.parse.failed') {
        return res.status(400).json({ message: 'Invalid JSON body' });
    }
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
});

async function start() {
    try {
        await sequelize.sync();
        app.listen(3000, () => console.log('Running on http://localhost:3000'));
    } catch (error) {
        console.error(error);
        process.exitCode = 1;
    }
}

start();
