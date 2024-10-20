const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MongoDB connection string is not defined in environment variables.');
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// User Routes
const userRoutes = require('./routes/userRoutes'); // Adjusted path to use relative path
app.use('/api', userRoutes); // Mount user routes

// Class Routes
const classRoutes = require('./routes/classRoutes'); // Adjusted path to use relative path
app.use('/api', classRoutes); // Mount class routes

// Student Routes
const studentRoutes = require('./routes/studentRoutes'); // Adjusted path to use relative path
app.use('/api', studentRoutes); // Mount student routes

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});