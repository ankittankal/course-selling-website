const mongoose = require('mongoose');
const express = require('express');
const {User, Course, Admin} = require('../db/index');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../middleware/auth');
const { authenticateJwt } = require('../middleware/auth');

/*==================================================================
=======================  Admin routes  =============================
===================================================================*/
const router = express.Router();

router.post('/signup', (req, res) => {
    const {username, password} = req.body;
  
    function callback(admin) {
      if (admin) {
        res.status(403).json({ message: 'Admin already exists' });
      } else {
        const obj = { username: username, password: password };
        const newAdmin = new Admin(obj);
        newAdmin.save();
        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Admin created successfully', token });
      }
  
    }
  
    Admin.findOne({ username }).then(callback);
  });
  
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    const admin = await Admin.findOne({ username });
    if (admin) {
      const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Admin logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  
});

router.get('/me' , authenticateJwt , (req,res) => {
    console.log(req.user);
    res.json({
      username : req.user.username
    });
});
  
router.post('/courses', authenticateJwt, async (req, res) => {
      const newCourse = new Course(req.body);
      await newCourse.save();
  
      //console.log(newCourse);
  
      res.json( { message: 'Course created successfully', courseId : newCourse.id} );
  });
  
router.put('/courses/:courseId', authenticateJwt ,async (req, res) => {
      let ID = req.params.courseId;
  
      const course = await Course.findByIdAndUpdate(ID, req.body, { new: true });
      if (course) {
        res.json({ message: 'Course updated successfully' });
      } else {
        res.status(404).json({ message: 'Course not found' });
      }
  });

router.get('/courses/:courseId', authenticateJwt, async (req, res) => {
  let ID = req.params.courseId;
  let CourseIdExists = false;

  const course = await Course.findOne({ _id: ID });
  
  if (course) {
    res.json({ course });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});
  
router.get('/courses', authenticateJwt, async (req, res) => {
    const courses = await Course.find({});
    res.json( courses );
  });

module.exports = router;