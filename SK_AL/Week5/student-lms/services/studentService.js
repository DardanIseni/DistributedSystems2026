const Student = require('../models/Student')

async function getAllStudents(){
    return await Student.findAll()
}

async function getStudentById(id){
    return await Student.findByPk(req.params.id)
}


async function createStudent(body) {
    return await Student.create(body)
}

module.exports = {
    getAllStudents,
    getStudentById,
    createStudent
}
