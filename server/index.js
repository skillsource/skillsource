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
  const courses = await db.Course.findAll({ include: [db.Step, db.Comment] });
  res.send(courses);
}));

app.post('/courses', wrap(async (req, res) => {
  // expecting course: { name, description, creatorId, steps }
  // where array steps: [{ ordinalNumber, name, text }]
  // doing the work of POST /steps
  const course = req.body;
  const newCourse = await db.Course.create(course, { include: [{ model: db.Step }] });
  res.send(newCourse);
}));

// enrollments
app.get('/enrollments/:id', wrap(async (req, res) => {
  const { userId } = req.params.id;
  const user = await db.User.findById(userId);
  const enrollments = await user.getCourses();
  res.send(enrollments);
}));

app.post('/enrollments', wrap(async (req, res) => {
  const { userId, courseId } = req.body;
  const user = await db.User.findById(userId);
  const course = await db.Course.findById(courseId, { include: db.Step });
  try {
    await user.addCourse(courseId);
    // doing the work of POST /user-steps
    await user.addSteps(course.steps);
  } catch(err) {
    throw boom.badRequest('User already enrolled in this course');
  }
  res.send(course);
}));

// steps
app.get('/steps', wrap(async (req, res) => {
  const { courseId } = req.query;
  const course = await db.Course.findById(courseId);
  const steps = await course.getSteps();
  res.send(steps);
}));

// userSteps
app.get('/user-steps', wrap(async (req, res) => {
  const { userId, courseId } = req.query;
  const user = await db.User.findById(userId);
  const userSteps = await user.getSteps({ where: { courseId } });
  res.send(userSteps);
}));

app.patch('/user-steps', wrap(async (req, res) => {
  const { userId, stepId, completed } = req.query;
  await db.UserStep.update({ completed }, { where: { userId, stepId } });
  const updatedUserStep = await db.UserStep.findOne({ where: { userId, stepId } });
  res.send(updatedUserStep);
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

// comments
app.get('/comments', wrap(async (req, res) => {
  const { courseId } = req.query;
  const course = await db.Course.findById(courseId);
  const comments = await course.getComments();
  res.send(comments);
}));

app.post('/comments', wrap(async (req, res) => {
  const { userId, courseId, text } = req.body;
  const user = await db.User.findById(userId);
  const course = await db.Course.findById(courseId);
  const comment = await db.Comment.create({ userId, courseId, text });
  res.send(comment);
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
  res.send({
    token: token,
    user_id: user.id
  });
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
