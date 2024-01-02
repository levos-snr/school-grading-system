const Student = require('../models/studentModel');
const Course = require('../models/courseModel');

module.exports = {
  getStudentById: async (req, res) => {
    const { id } = req.params;
  
    try {
      // Convert the id to a valid ObjectId
      const validId = mongoose.Types.ObjectId(id);
  
      const student = await Student.findById(validId)
      .then (student => {
        if (!student) {
          return res.status(404).json({ error: 'Student not found' });
        }

        res.status(200).json(student);

      })
      
    } catch (error) {
      console.error('Error fetching student:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  addStudent: async (req, res) => {
    try {
      const { studentName, studentId } = req.body;

      // Validate input (you can add more validation as needed)
      if (!studentName || !studentId) {
        return res.status(400).json({ success: false, message: 'Invalid input' });
      }

      // Check if student with the given studentID already exists
      const existingStudent = await Student.findOne({ studentId });

      if (existingStudent) {
        return res.status(409).json({ success: false, message: 'Student with this ID already exists' });
      }

      // Create a new student instance
      const newStudent = new Student({
        studentName,
        studentId,
      });

      // Save the student to the database
      await newStudent.save();

      // Respond with success message
      res.json({ success: true, message: 'Student added successfully' });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  registerCourse: async (req, res) => {
    const { studentId, semester, courseCode, courseName } = req.body;

    try {
      // Find the student by studentId
      let student = await Student.findOne({ studentId });

      if (!student) {
        // If the student doesn't exist, add the student
        student = new Student({
          studentId,
        });

        await student.save();
      }

      // Check if the course exists
      let course = await Course.findOne({ courseCode });

      if (!course) {
        // If the course doesn't exist, add the course
        course = new Course({
          courseCode,
          courseName,
          semester,
        });

        await course.save();
      }

      // Check registration limits for each semester
      const semesterCourses = student.registeredCourses[semester];
      if (semesterCourses.length >= 5) {
        return res.status(400).json({ error: 'You have reached the maximum limit of 5 courses for this semester.' });
      }
      if (semesterCourses.some(course => course.courseCode === courseCode)) {
        return res.status(401).json({ error: 'You are already registered for this course.' });
     }

      // Register the course
      semesterCourses.push({ courseCode, courseName });

      // Save the updated student information
      await student.save();

      return res.status(200).json({ message: 'Course registered successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
