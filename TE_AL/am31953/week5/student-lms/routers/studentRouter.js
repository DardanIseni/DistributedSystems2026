const express = require('express');
const router = express.Router();
const studentService = require('../services/studentService');


// Get all students
router.get("/students", async (req, res) => {
    const students = await studentService.getAllStudents();
    res.json(students);
});


// Get student by ID
router.get('/students/:id', async (req, res) => {
    const student = await studentService.getStudentById(req.params.id);
    res.json(student);
});


// Create student
router.post('/students', async (req, res) => {
    const student = await studentService.createStudent(req.body);
    res.json(student);
});


module.exports = router;