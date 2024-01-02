const Semester = require('../models/semesterModel');

// Add semester
exports.addSemester = async (req, res) => {
    try {
      const { semesterName, academicYear } = req.body;
  
      // Validate input (you can add more validation as needed)
      if (!semesterName || !academicYear) {
        return res.status(400).json({ success: false, message: 'Invalid input' });
      }
  
      // Create a new semester instance
      const newSemester = new Semester({
        semesterName,
        academicYear,
      });
  
      // Save the semester to the database
      await newSemester.save();
  
      // Respond with success message
      res.json({ success: true, message: 'Semester added successfully' });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
