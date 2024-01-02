const mongoose = require('mongoose');


const lecturerSchema = new mongoose.Schema({
  lecturerName: { type: String, required: true },
  lecturerID: { type: String, required: true, unique: true },
});

const Lecturer = mongoose.model('Lecturer', lecturerSchema);

module.exports = Lecturer;
