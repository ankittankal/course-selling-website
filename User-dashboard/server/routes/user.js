const mongoose = require('mongoose');
const express = require('express');
const {User, Course, Admin} = require('../db/index');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../middleware/auth');
const { authenticateJwt } = require('../middleware/auth');

/*=================================================================
=======================  User routes  =============================
===================================================================*/

const router = express.Router();

router.post('/signup',async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      res.status(403).json({ message: 'User already exists' });
    } else {
      const newUser = new User({ username, password });
      await newUser.save();
      const token = jwt.sign({id : newUser._id}, SECRET, { expiresIn: '1h' });
      res.json({ message: 'User created successfully', token });
    }
  });
  
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({id : user._id}, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  });

  router.get('/me' , authenticateJwt ,async (req,res) => {
    const userDetails = await User.findOne({_id: req.userId});
  
    if(userDetails){
      res.json({username : userDetails.username, PurchasedCourses: userDetails.purchasedCourses});
    }else{
      res.status(403).json({message: "User not found"});
    }
  });
  
router.get('/courses', authenticateJwt, async (req, res) => {

    const courses = await Course.find({published: true});
    res.json({ courses : courses});       // logic to list all courses
  });
  
router.post('/courses/:courseId', authenticateJwt, async (req, res) => {
    const course = await Course.findById(req.params.courseId);
  
    if (course) {
      const user = await User.findOne({_id: req.userId});
      if (user) {
        user.purchasedCourses.push(course);
        await user.save();
        res.json({ message: 'Course purchased successfully' });
      } else {
        res.status(403).json({ message: 'User not found' });
      }
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  });

router.get('/courses/:courseId', authenticateJwt, async (req, res) => {
  let ID = req.params.courseId;

  const course = await Course.findOne({ _id: ID });
  const userDetails = await User.findOne({_id: req.userId});
  
  if (course) {
    res.json({ course  , purchasedCourses: userDetails.purchasedCourses});
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});
  
router.get('/purchasedCourses', authenticateJwt, async (req, res) => {
    const user = await User.findOne({_id: req.userId}).populate('purchasedCourses');
    if (user) {
      res.json({ purchasedCourses: user.purchasedCourses || [] });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  });

module.exports = router;