const Course = require('../models/Course');

async function getAllCourses() {
    return await Course.findAll();
}

async function getCourse(id) {
    return await Course.findByPk(id);
}

async function createCourse(body) {
    return await Course.create(body);
}

async function updateCourse(id, body) {
    const course = await Course.findByPk(id);

    if (!course) {
        return null;
    }

    await course.update(body);

    return course;
}

async function deleteCourse(id) {
    const course = await Course.findByPk(id);

    if (!course) {
        return null;
    }

    await course.destroy();

    return course;
}

module.exports = {
    getAllCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse
};