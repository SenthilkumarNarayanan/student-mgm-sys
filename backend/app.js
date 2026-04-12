const express = require('express');
const cors = require("cors");
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'https://student-mgm-sys-frontend.onrender.com',
    'http://localhost:4200',
    'http://localhost:3000'
  ],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

// Apply CORS
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/student', studentRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

module.exports = app;