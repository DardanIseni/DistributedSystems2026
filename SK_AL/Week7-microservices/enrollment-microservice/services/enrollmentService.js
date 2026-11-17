const Enrollment = require('../models/Enrollment');


async function addEnrollment(body) {
    
    //check if studentExist

    const studentRes = await fetch(
        `http://localhost:3000/student/${body.studentId}`
    )

    if(!studentRes.ok){
        throw new Error("Student does not exist");
    }

    const student = await studentRes.json();


    //check if course exist

    const courseRes = await fetch(
        `http://localhost:3002/course/${body.courseId}`
    )

    if(!courseRes.ok){
        throw new Error("Course does not exist");
    }

    const course = await courseRes.json();


    //add student to course
    return await Enrollment.create(body);
}


module.exports = {
   addEnrollment
};