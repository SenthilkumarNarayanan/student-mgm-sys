const app = require('./app');  // This already has your routes and CORS config
const connectDB = require('./config/db');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();
// ============================================
// START SERVER
// ============================================
const PORT = process.env.PORT || 3000;

// Make sure CORS is applied before starting

app.listen(PORT, () => {
  console.log('====================================');
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('====================================');
});