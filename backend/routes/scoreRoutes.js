const express = require('express');
const submitScores = require('../controllers/scoreController');
const router = express.Router();


router.post('/submit-scores', submitScores);


module.exports = router;