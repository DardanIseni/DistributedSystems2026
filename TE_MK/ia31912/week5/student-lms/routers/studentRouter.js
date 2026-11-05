const express = require('express')
const router = express.Router();
const studentService= require('../services/studentService')

router.get('/students', async (req, res) => {
  const students = await studentService.getAllStudents();
  res.json(students);
})

router.get('/students/:id', async (req, res) => {
  const students = await studentService.getStudent(req.params.id);
  res.json(students);
})

router.post('/student', async (req, res) => {
  const students = await studentService.createStudent(req.body);
  res.json(students);
})

module.exports = router;
