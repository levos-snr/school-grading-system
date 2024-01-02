const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

const courseController = require('../controllers/courseController');


// Route to add a new student
router.post('/add-student', studentController.addStudent);

// Route to register a course
router.post('/register-course', studentController.registerCourse);

// Route to fetch a student by ID
router.get('/:id', studentController.getStudentById);

router.post('/add-course', courseController.addCourse);



module.exports = router;
