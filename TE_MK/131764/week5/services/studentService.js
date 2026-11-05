const Student = require('../models/Student');


async function getAllStudents() {
    return await Student.findAll();
}

async function getStudentById(id) {  //make sure to pass the id as a parameter when calling this function
    return await Student.findByPk(id);
}

async function createStudent(body) {
    return await Student.create(body);
}


module.exports = {
    getAllStudents,
    getStudentById,
    createStudent
};