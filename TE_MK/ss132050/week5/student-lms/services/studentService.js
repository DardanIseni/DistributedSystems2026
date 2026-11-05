const Student = require("../models/Student");

async function getAllStudents() {
    return await Student.findAll();
}

async function getStudent(id) {
    return await Student.findByPk(id);
}

async function createStudent(body) {
    return await Student.create(body);
}

module.exports = {
    getAllStudents,
    getStudent,
    createStudent
};
