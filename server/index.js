const db = require('../db/index');

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
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors());
app.use(express.static(__dirname + '/../client/dist'));

// courses
app.get('/courses', wrap(async (req, res) => {
  const courses = await db.Course.findAll();
  res.send(courses);
}));

app.post('/courses', wrap(async (req, res) => {
  const course = req.body;
  const newCourse = await db.Course.create(course, { include: [db.Step] });
  res.send({ course: newCourse });
}));

// enrollments
app.get('/enrollments/:userId', wrap(async (req, res) => {
  const { userId } = req.params;
  const user = await db.User.findById(userId);
  if (!user) throw boom.badRequest('Cannot locate user by supplied userId');

  const courses = await user.getCourses({ include: [db.Step] });
  res.send(courses);
}));

app.post('/enrollments', wrap(async (req, res) => {
  const { userId, courseId } = req.body;
  const user = await db.User.findById(userId);
  if (!user) throw boom.badRequest('Cannot locate user by supplied userId');

  const course = await db.Course.findById(courseId, { include: db.Step });
  if (!course) throw boom.badRequest('Cannot locate course by supplied courseId');

  try {
    await user.addCourse(courseId);
    await user.addSteps(course.steps);
  } catch(err) {
    throw boom.badRequest('User already enrolled in this course');
  }

  res.send(course);
}));

// users
app.get('/users/:userId', wrap(async (req, res) => {
  const { userId } = req.params;
  const user = await db.User.findById(userId);
  if (!user) throw boom.notFound('Cannot locate user by supplied userId');
  res.send(user);
}));

app.post('/users', wrap(async (req, res) => {
  const { username, email, password } = req.body;
  const user = await db.User.findOne({ where: { email } });
  if (user) throw boom.badRequest('Email already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await db.User.create({ username, email, password: hashedPassword });
  res.send(newUser);
}));

// auth
app.post('/login', wrap(async (req, res) => {
  const { email, password } = req.body;
  const user = await db.User.findOne({ where: { email } });
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
