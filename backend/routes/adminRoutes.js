// backend/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const studentController = require('../controllers/studentController');
const lecturerController = require('../controllers/lecturerController');
const semesterController =  require('../controllers/semesterController');
const courseController =  require('../controllers/courseController');


// Add student
router.post('/add-student', studentController.addStudent);

// Add course
router.post('/add-course', courseController.addCourse);

// Add semester
router.post('/add-semester', semesterController.addSemester);

// Add lecturer
router.post('/add-lecturer', lecturerController.addLecturer);

module.exports = router;
