const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Route to add a new course
router.post('/add-course', courseController.addCourse);

// Route to get all courses
router.get('/', courseController.getAllCourses);

module.exports = router;
