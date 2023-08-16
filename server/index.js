const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

const JWT_SECRET_KEY = 'your_secret_key';

function generateToken( req ) {
  const token = jwt.sign({ username: req.body.username },
                    JWT_SECRET_KEY, 
                    { expiresIn: '1h' });
  
  return token;
}

function authenticateJwt(req, res, next){
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      
      //console.log("from jwt" , user);
      req.user = user;
      next();
    });
  }
  else {
    res.sendStatus(401);
  }
}

app.get('/admin/me' , authenticateJwt , (req,res) => {
  //console.log(req.user);
  res.json({
    username : req.user.username
  });
});

// Admin routes
app.post('/admin/signup', (req, res) => {
  const { username, password } = req.body;
  let adminExists = false;

  for (let i = 0; i < ADMINS.length; i++) {
    if (ADMINS[i].username === username && ADMINS[i].password == password) {
      adminExists = true;
      break; // Exit the loop when an admin is found
    }
  }

  if (adminExists) {
    res.status(409).json({ message: "Admin with this username and password already exists" });
  } else {
    ADMINS.push(req.body);
    const token = generateToken(req);
    //console.log(ADMINS);
    res.status(200).json({ message: 'Admin created successfully', token: token });
  }
});

app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  const admin = ADMINS.find(a => a.username === username && a.password === password);

  if (admin) {
    const token = generateToken(req);
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Admin authentication failed' });
  }
});

app.post('/admin/courses', authenticateJwt, (req, res) => {
    req.body.id = Date.now(); // use timestamp as course ID
    COURSES.push(req.body);
    res.json( { message: 'Course created successfully', courseId: req.body.id } );
});

app.put('/admin/courses/:courseId', authenticateJwt, (req, res) => {
  let ID = req.params.courseId;
  let CourseIdExists = false;

  for (let i = 0; i < COURSES.length; i++) {
    if (COURSES[i].id == ID) {

      CourseIdExists = true;
      COURSES[i] = req.body;
      COURSES[i].id = ID;

      res.json( { message: 'Course updated successfully' } );
      break; // Exit the loop when an COURSE is found
    }
  }

  if (!CourseIdExists) {
    res.status(404).json( { message: 'Unable to find the course' } );
  }
});

app.get('/admin/courses/:courseId', authenticateJwt, (req, res) => {
  let ID = req.params.courseId;
  let CourseIdExists = false;

  for (let i = 0; i < COURSES.length; i++) {
    if (COURSES[i].id == ID) {

      CourseIdExists = true;

      res.json({course : COURSES[i]});
      return; // Exit the loop when an COURSE is found
    }
  }

  if (!CourseIdExists) {
    res.status(404).json( { message: 'Unable to find the course' } );
  }
});

app.get('/admin/courses', (req, res) => {
  res.json({ courses: COURSES });
});


//----------------------------------------------------------------------
//----------------------------------------------------------------------


// User routes
app.post('/users/signup', (req, res) => {
  const user = req.body;
  const existingUser = USERS.find(u => u.username === user.username);
  if (existingUser) {
    res.status(403).json({ message: 'User already exists' });
  } else {
    USERS.push(user);
    const token = generateToken(req);
    res.json({ message: 'User created successfully', token });
  }
});

app.post('/users/login', (req, res) => {
  const { username, password } = req.headers;
  const user = USERS.find(u => u.username === username && u.password === password);
  if (user) {
    const token = generateToken(req);
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'User authentication failed' });
  }
});

app.get('/users/courses', authenticateJwt, (req, res) => {
  res.json({ courses: COURSES });
});

app.post('/users/courses/:courseId', authenticateJwt,(req, res) => {
  let courseId = parseInt(req.params.courseId);
  let CourseIdExists = COURSES.find(course => course.id == courseId && course.published);

  if(CourseIdExists){
    //console.log(req.body);
    //req.body.user.purchasedCourses.push(courseId);
    const user = USERS.find(u => u.username === req.user.username);
    if (user) {
      if (!user.purchasedCourses) {
        user.purchasedCourses = [];
      }
      user.purchasedCourses.push(courseId);
      res.json({ message: 'Course purchased successfully' });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  }
  else{
    res.status(404).send({message: 'Course not found'});
  }
});

app.get('/users/purchasedCourses', authenticateJwt, (req, res) => {
  const user = USERS.find(u => u.username === req.user.username);
  if (user && user.purchasedCourses) {
    res.json({ purchasedCourses: user.purchasedCourses });
  } else {
    res.status(404).json({ message: 'No courses purchased' });
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
