const express = require('express');
const router = express.Router();

const studentService = require('../services/studentService');

router.get('/students', async (req, res) => {
    const students = await studentService.getAllStudents();
    res.json(students);
});

router.get('/:id', async (req, res) => {
    const student = await studentService.getStudent(req.params.id);

    if (!student) {
        return res.status(404).json({
            message: 'Student not found'
        });
    }

    res.status(200).json(student);
});

router.post('/', async (req, res) => {
    const student = await studentService.createStudent(req.body);
    res.status(201).json(student);
});

module.exports = router;