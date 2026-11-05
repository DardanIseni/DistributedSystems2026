const express = require('express');
const router = express.Router();
const studentService = require('../services/studentService');

router.get('/students', async (req,res) => {
    const students = await studentService.getAllStudents
    res.json(students);
})

router.get('/students/:id', async (req,res) =>{
    const student = await studentService.getStudent(req.params.id)
    res.json(student);
})

router.post('/student', async (req,res) => {
    const student = await studentService.createStudent
    res.json(student);
})



module.exports = router;