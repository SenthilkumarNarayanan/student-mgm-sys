const express = require('express');
const cors= require("cors");
const authRoutes = require('./routes/authRoutes')
const adminRoutes = require('./routes/adminRoutes')
const studentRoutes= require('./routes/studentRoutes')

const app = express();
const corsOptions = {
  origin: [
    'https://student-mgm-sys-frontend.onrender.com',  // Your frontend URL
    'http://localhost:4200',  // For local development
    'http://localhost:3000'   // For local testing
  ],
  credentials: true,  // If you're using cookies/sessions
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

// Use CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests explicitly (optional but good practice)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.get('/',(req,res)=>{
//   res.send("server is running")
// })
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/admin',adminRoutes)
app.use('/api/v1/student',studentRoutes)

module.exports = app;