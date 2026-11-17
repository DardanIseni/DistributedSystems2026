const Student = require('../models/student'); // adjust to your model's path

async function getAllStudents() {
    return await Student.findAll();
}

async function getStudentById(id) {
    return await Student.findByPk(id);
}

async function createStudent(data) {
    return await Student.create(data);
}

module.exports = {
     getAllStudents,
     getStudentById,
     createStudent };