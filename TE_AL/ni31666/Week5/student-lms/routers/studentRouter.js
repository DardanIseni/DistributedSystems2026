const express = require('express');
const router = express.Router();
const studentService = require('../services/studentServices');

// Read all
router.get('/students', async (req, res) => {
    try {
        const students = await studentService.getAllStudents();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Read one
router.get('/students/:id', async (req, res) => {
    try {
        const student = await studentService.getStudentById(req.params.id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create
router.post('/students', async (req, res) => {
    try {
        const student = await studentService.createStudent(req.body);
        res.status(201).json(student);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;