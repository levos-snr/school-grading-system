require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB 
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", (error) => console.log(error))
db.once("open", () => console.log("Connected to Database"))

// Middleware

app.use(express.json())
app.use(cors());
// Routes
const adminRoutes = require('./routes/adminRoutes');
const studentRoutes = require('./routes/studentRoutes');
const lecturerRoutes = require('./routes/lecturerRoutes');
const courseRoutes = require('./routes/courseRoutes');
const scoreRoutes = require('./routes/scoreRoutes');




app.use('/admin', adminRoutes);
app.use('/student', studentRoutes);
app.use('/lecturer', lecturerRoutes);
app.use('/courses', courseRoutes);


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});