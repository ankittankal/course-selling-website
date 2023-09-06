const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

app.use(express.json());
app.use(cors());

app.use("/admin" , adminRoutes);
app.use("/user",userRoutes);

// Connect to MongoDB
mongoose.connect('mongodb+srv://ankittankal:7681897898@cluster0.9thcvg5.mongodb.net/courses', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" });

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
