const Lecturer = require('../models/lecturerModel');


module.exports = {
 // Add lecturer
addLecturer : async (req, res) => {
  try {
    const { lecturerName, lecturerID } = req.body;
 
    // Create a new instance of the Lecturer model
    const newLecturer = new Lecturer({
      lecturerName,
      lecturerID
    });
 
    // Save the new lecturer to the database
    await newLecturer.save();
 
    // Respond with success message
    res.json({ success: true, message: 'Lecturer added successfully' });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
 }, 
};
