const express = require('express');
const router = express.Router();
const studentService = require('../services/studentService');

router.get('/students', async (req, res) => {
    const students = await studentService.getAllStudents();
    res.json(students);
})

router.get('/students/:id', async (req, res) => {
    const id = req.params.id;
    const student = await studentService.getStudentById(id);
    res.json(student);
})

router.post('/students', async (req, res) => {
    const student = await studentService.createStudent(req.body);
    res.json(student);
});

module.exports = router;
