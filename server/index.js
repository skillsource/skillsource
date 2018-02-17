const Courses = require('../services/courses');
const Enrollments = require('../services/enrollments');
const Auth = require('../services/enrollments');
const Users = require('../services/users');

const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

const wrap = fn => (...args) => fn(...args).catch(args[2]);

// courses
app.get('/courses', wrap(async (req, res) => {
  const courses = await Courses.get();
  res.send(courses);
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
  const user = await Users.get(req.params.userId);
  res.send(user);
}));

app.post('/users', wrap(async (req, res) => {
  const user = await Users.create(req.body);
  res.send(user);
}));

// todo
// auth - use session tokens
// app.post('/login', wrap(async (req, res) => {
//   res.send();
// }));

// app.delete('/')
// log user out - destroy token

app.listen(3000, () => console.log('Example app listening on port 3000!'));
