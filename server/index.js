const Courses = require('../services/courses');
const Enrollments = require('../services/enrollments');
const Auth = require('../services/enrollments');
const Users = require('../services/users');

const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');

const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

const wrap = fn => (...args) => fn(...args).catch(args[2]);

const jwtMW = exjwt({
  secret: 'secret'
});

app.use(cors());

// courses
app.get('/courses', wrap(async (req, res) => {
  console.log('GET received on /courses')
  const courses = await Courses.get((err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving courses.'
      });
    } else {
      res.status(201).json({
        success: true,
        message: "Success.",
        data: result
      });
    }
  });
  console.log('Courses sent back', courses)
}));

app.get('/courses/:courseId', wrap(async (req, res) => {
  const course = await Courses.get(req.params.courseId);
  res.send(course);
}));

app.post('/courses', wrap(async (req, res) => {
  const courseId = await Courses.create(req.body);
  res.send(courseId);
}));

// enrollments
app.get('/enrollments/:userId', wrap(async (req, res) => {
  const enrollments = await Enrollments.get(req.params.userId);
  res.send(enrollments);
}));

app.post('/enrollments', wrap(async (req, res) => {
  const userCourseId = await Enrollments.create(req.body);
  res.send(userCourseId);
}));

app.put('/enrollments', wrap(async (req, res) => {
  const enrollment = await Enrollments.update(req.body);
  res.send(enrollment);

  const { courseId } = req.body;
  Courses.updateRating(courseId);
}));

// users
app.get('/users/:userId', wrap(async (req, res) => {
  const user = Users.get(req.params.userId, (error, user) => {
    if (error) {
      res.status(500).json({
        success: false,
        message: 'Error getting user.'
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Successfully retrieved user.",
        data: user
      });
    }
  });
}));

app.post('/users', wrap(async (req, res) => {
  console.log('POST to /users', req.body);
  let token = jwt.sign({ username: req.body.username, email: req.body.email }, 'secret', { expiresIn: 129600 });
  const user = Users.create(req.body, (error, user) => {
    if (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating user.'
      });
    } else {
      res.status(201).json({
        success: true,
        message: "Success.",
        data: user,
        token: token
      });
    }
  })
}));

// todo
// auth - use session tokens
app.post('/login', wrap(async (req, res) => {
  const { username, password } = req.body;
  for (let user of users) {
    if (username == user.username && password == user.password) {
      let token = jwt.sign({ id: user.id, username: user.username }, 'secret', { expiresIn: 129600 });
      res.status(201).json({
        success: true,
        err: null,
        token: token
      });
    } else {
      res.status(401).json({
        success: false,
        token: null,
        err: 'Username or password is incorrect'
      });
    }
  }
}));

// app.delete('/')
// log user out - destroy token

// app.use(function (err, req, res, next) {
//   // Send the error rather than to show it on the console
//     if (err.name === 'UnauthorizedError') {
//         res.status(401).send(err);
//     }
//     else {
//         next(err);
//     }
// });

app.listen(3000, () => console.log('Example app listening on port 3000!'));
