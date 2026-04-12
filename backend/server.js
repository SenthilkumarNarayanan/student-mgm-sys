const app = require('./app');
const connectDB = require('./config/db');
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// SERVE ANGULAR STATIC FILES
// ============================================

// Define the path to Angular build files
const angularBuildPath = path.join(
  __dirname, 
  "../student-management-system/dist/student-management-system/browser"
);

console.log('📁 Angular build path:', angularBuildPath);

// Serve static files (CSS, JS, images, etc.)
app.use(express.static(angularBuildPath));

// ============================================
// HANDLE ANGULAR ROUTING - FIXED VERSION
// ============================================

// ✅ FIX: Use a regular function instead of the wildcard '*'
// This catches all GET requests that don't match previous routes
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(angularBuildPath, 'index.html'), (err) => {
    if (err) {
      console.error('Error sending index.html:', err);
      res.status(500).send('Error loading application');
    }
  });
});

// Alternative fix if the above doesn't work:
// app.get('/*', (req, res) => {
//   if (!req.path.startsWith('/api')) {
//     res.sendFile(path.join(angularBuildPath, 'index.html'));
//   }
// });

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler for API routes
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ============================================
// START SERVER
// ============================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('====================================');
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📁 Serving Angular from: ${angularBuildPath}`);
  console.log('====================================');
});