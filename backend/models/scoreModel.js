const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
    courseID: String,
    studentID: String,
    assignment1: Number,
    assignment2: Number,
    cat1: Number,
    cat2: Number,
    exam: Number,
   });
   
   const Score = mongoose.model('Score', ScoreSchema);
   