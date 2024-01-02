const mongoose = require('mongoose');


const semesterSchema = new mongoose.Schema({
    semesterName: { type: String, required: true, unique: true },
    academicYear: { type: String, required: true },
  });


  const Semester = mongoose.model('Semester', semesterSchema);


  module.exports = Semester