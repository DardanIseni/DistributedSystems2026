const express = require('express');
const router = express.Router();
const studentService = require('../services/studentService');

router.get('/students', async (req, res) => {
    const students = await studentService.getAllStudents();
    res.json(students);
})

router.get('/students/:id', async (req, res) => {
    const student = await studentService.getStudentById(req.params.id);
    if (student) {
        res.json(student);
    } else {
        res.status(404).json({ message: 'Student not found' });
    }       
})

router.post('/students', async (req, res) => {
    const newStudent = await studentService.createStudent(req.body);
    res.status(201).json(newStudent);
})

module.exports = router;