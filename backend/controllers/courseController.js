const Course = require('../models/courseModel');

// Add course
exports.addCourse = async (req, res) => {
    try {
      const { courseCode, courseName, semester } = req.body;
  
      // Validate input (you can add more validation as needed)
      if (!courseCode || !courseName || !semester) {
        return res.status(400).json({ success: false, message: 'Invalid input' });
      }
  
      // Create a new course instance
      const newCourse = new Course({
        courseCode,
        courseName,
        semester,
      });
  
      // Save the course to the database
      await newCourse.save();
  
      // Respond with success message
      res.json({ success: true, message: 'Course added successfully' });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };

  exports.getAllCourses = async (req, res) => {
      try {
        const courses = await Course.find();
        res.json(courses);
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
    }
