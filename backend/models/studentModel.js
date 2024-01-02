const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    required: true,
    unique: true,
  },
  registeredCourses: {
    semester1: [{
      courseCode: { type: String, ref: 'Course' },
      courseName: String,
    }],
    semester2: [{
      courseCode: { type: String, ref: 'Course' },
      courseName: String,
    }],
  },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
