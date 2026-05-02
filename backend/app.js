const express = require('express');
const cors = require("cors");
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const studentRoutes = require('./routes/studentRoutes');
const swaggerSpec = require("./config/swagger");
const swaggerUi = require("swagger-ui-express");

const app = express();
app.use(express.json());

// CORS configuration
const allowedOrigins = [
  "http://localhost:4200",
  "https://student-mgm-sys-frontend.onrender.com",
  "http://localhost:3000"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
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