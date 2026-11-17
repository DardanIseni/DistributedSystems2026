const express = require('express');
const router = express.Router();

const courseService = require('../services/courseService');

router.get('/courses', async (req, res) => {
    const courses = await courseService.getAllCourses();

    res.json(courses);
});

router.get('/course/:id', async (req, res) => {
    const course = await courseService.getCourse(req.params.id);

    if (!course) {
        return res.status(404).json({
            message: 'Course not found'
        });
    }

    res.json(course);
});

router.post('/course', async (req, res) => {
    const course = await courseService.createCourse(req.body);

    res.status(201).json(course);
});

router.put('/course/:id', async (req, res) => {
    const course = await courseService.updateCourse(
        req.params.id,
        req.body
    );

    if (!course) {
        return res.status(404).json({
            message: 'Course not found'
        });
    }

    res.json(course);
});

router.delete('/course/:id', async (req, res) => {
    const course = await courseService.deleteCourse(req.params.id);

    if (!course) {
        return res.status(404).json({
            message: 'Course not found'
        });
    }

    res.json({
        message: 'Course deleted'
    });
});

module.exports = router;