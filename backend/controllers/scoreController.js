const Score = require('../models/scoreModel');



exports.submitScores = async (req, res) => {
    const { courseID, studentID, assignment1, assignment2, cat1, cat2, exam } = req.body;
   
    const score = new Score({
      courseID,
      studentID,
      assignment1,
      assignment2,
      cat1,
      cat2,
      exam,
    });
   
    try {
      await score.save();
      res.status(201).send(score);
    } catch (err) {
      res.status(400).send(err);
    }
   }