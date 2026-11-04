require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const studentRoutes = require('./routes/students');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/students', studentRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Student Directory API is running' });
});

// Fallback to frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
