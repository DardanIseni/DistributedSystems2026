const express = require('express');
const sequelize = require('./config/database');
const Student = require('./models/Student');

const app = express();
const PORT = 3001;

// Middleware to read JSON request bodies
app.use(express.json());

// GET - Retrieve all students
app.get('/students', async (req, res) => {
    try {
        const students = await Student.findAll();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET - Retrieve a student by ID
app.get('/students/:id', async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST - Create a new student
app.post('/student', async (req, res) => {
    try {
        const student = await Student.create(req.body);

        res.status(201).json({
            message: 'Student created successfully',
            student: student
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT - Update an existing student
app.put('/students/:id', async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        await student.update(req.body);

        res.status(200).json({
            message: 'Student updated successfully',
            student: student
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE - Delete a student
app.delete('/students/:id', async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        await student.destroy();

        res.status(200).json({
            message: 'Student deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Connect to database and start server
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}).catch(error => {
    console.error('Database connection failed:', error);
});