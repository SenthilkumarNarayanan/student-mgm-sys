const express = require('express');
const cors= require("cors");
const authRoutes = require('./routes/authRoutes')
const adminRoutes = require('./routes/adminRoutes')
const studentRoutes= require('./routes/studentRoutes')

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.get('/',(req,res)=>{
//   res.send("server is running")
// })
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/admin',adminRoutes)
app.use('/api/v1/student',studentRoutes)

module.exports = app;