const express = require('express');
const router = express.Router();
const studentService = require('../services/studentService');

router.get("/students",async(req,res) => {
    const students = await studentService.getAllStudents();
    res.json(students)
})


module.exports = router;