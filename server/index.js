const Courses = require('../services/courses');
const Enrollments = require('../services/enrollments');
const Auth = require('../services/enrollments');
const Users = require('../services/users');

const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const boom = require('boom');
const cors = require('cors');
const exjwt = require('express-jwt');
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const jwtMW = exjwt({ secret: 'secret' });
const wrap = fn => (...args) => fn(...args).catch(args[2]);

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/../client/dist'));

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
  const { userId } = req.params;
  const user = await Users.getUserById(userId);
  if (!user) throw boom.notFound('Cannot locate user by supplied userId');

  res.send(user);
}));

app.post('/users', wrap(async (req, res) => {
  const { username, email, password } = req.body;
  const user = await Users.getUserByEmail(email);
  if (user) throw boom.badRequest('Email already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await Users.create({ username, email, password: hashedPassword });
  res.send(newUser);
}));

// auth
app.post('/login', wrap(async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.getUserByEmail(email);
  const boomUnauthorized = boom.unauthorized('Email/password incorrect');
  if (!user) throw boomUnauthorized;

  const authorized = await bcrypt.compare(password, user.password);
  if (!authorized) throw boomUnauthorized;

  const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: 129600 });
  res.send(token);
}));

app.use((err, req, res, next) => {
  console.log(err);
  if (err.isBoom) {
    const { payload } = err.output;
    res.status(payload.statusCode).send(payload);
  } else {
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
