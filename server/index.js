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
app.use('/favicon.ico', express.static(__dirname + '/../favicon.ico'));

const unrestricted = [
  { url: '/courses', methods: ['GET'] },
  { url: '/steps', methods: ['GET'] },
  { url: '/users', methods: ['POST'] },
  { url: '/comments', methods: ['GET'] },
  { url: '/login', methods: ['POST'] },
]
app.use(exjwt({ secret: 'secret' }).unless({ path: unrestricted }));

// courses
app.get('/courses', wrap(async (req, res) => {
  const courses = await db.Course.findAll();
  res.send(JSON.stringify(courses));
}));

app.get('/courses/:courseId', wrap(async (req, res) => {
  const { courseId } = req.params;
  const course = await db.Course.findById(courseId, { include: [db.Step, db.Comment] });
  res.send(JSON.stringify(course));
}));

app.post('/courses', wrap(async (req, res) => {
  // expecting course: { name, description, url, steps }
  // where array steps: [{ ordinalNumber, name, text }]
  // doing the work of POST /steps
  const course = { creatorId: req.user.id, ...req.body };
  const newCourse = await db.Course.create(course, { include: [{ model: db.Step }] });
  res.send(JSON.stringify(newCourse));
}));

// enrollments
app.get('/enrollments', wrap(async (req, res) => {
  const userId = req.user.id;
  const user = await db.User.findById(userId);
  const enrollments = await user.getCourses();
  res.send(JSON.stringify(enrollments));
}));

app.post('/enrollments', wrap(async (req, res) => {
  const { courseId } = req.body;
  const user = await db.User.findById(req.user.id);
  const course = await db.Course.findById(courseId, { include: db.Step });
  try {
    await user.addCourse(courseId);
    // doing the work of POST /user-steps
    await user.addSteps(course.steps);
  } catch(err) {
    throw boom.badRequest('User already enrolled in this course');
  }
  res.send(JSON.stringify(course));
}));

app.patch('/enrollments/rating', wrap(async (req, res) => {
  const { courseId, rating } = req.body;
  const userId = req.user.id;
  await db.UserCourse.update({ rating }, { where: { userId, courseId } });
  const updatedUserCourse = await db.UserCourse.findOne({ where: { userId, courseId } });
  await db.updateCourseRating(courseId);
  res.send(JSON.stringify(updatedUserCourse));
}));

// steps
app.get('/steps', wrap(async (req, res) => {
  const { courseId } = req.query;
  const course = await db.Course.findById(courseId);
  const steps = await course.getSteps();
  res.send(JSON.stringify(steps));
}));

// userSteps
app.get('/user-steps', wrap(async (req, res) => {
  const { courseId } = req.query;
  const user = await db.User.findById(req.user.id);
  const userSteps = await user.getSteps({ where: { courseId } });
  res.send(JSON.stringify(userSteps));
}));

app.patch('/user-steps', wrap(async (req, res) => {
  const userId = req.user.id;
  const { stepId, completed } = req.query;
  await db.UserStep.update({ completed }, { where: { userId, stepId } });
  const updatedUserStep = await db.UserStep.findOne({ where: { userId, stepId } });
  res.send(JSON.stringify(updatedUserStep));
}));

// users
app.get('/users/:userId', wrap(async (req, res) => {
  const user = await db.User.findById(req.user.id);
  if (!user) throw boom.notFound('Cannot locate user by supplied userId');
  res.send(JSON.stringify(user));
}));

app.post('/users', wrap(async (req, res) => {
  const { username, email, password } = req.body;
  const user = await db.User.findOne({ where: { email } });
  if (user) throw boom.badRequest('Email already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await db.User.create({ username, email, password: hashedPassword });
  res.send(JSON.stringify(newUser));
}));

// comments
app.get('/comments', wrap(async (req, res) => {
  const { courseId } = req.query;
  const course = await db.Course.findById(courseId);
  const comments = await course.getComments();
  res.send(JSON.stringify(comments));
}));

app.post('/comments', wrap(async (req, res) => {
  const { courseId, text } = req.body;
  const user = await db.User.findById(req.user.id);
  const course = await db.Course.findById(courseId);
  const comment = await db.Comment.create({ userId, courseId, text });
  res.send(JSON.stringify(comment));
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
  res.send(JSON.stringify(token));
}));

app.use((err, req, res, next) => {
  console.log(err);
  if (err.isBoom) {
    const { payload } = err.output;
    res.status(payload.statusCode).send(payload);
  } else if (err.name === 'UnauthorizedError') {
    if (!req.user) res.status(401).send('Invalid jwt');
  } else {
    res.status(500).send('Whoops! Something went wrong. Check the server logs.');
  }
});

app.listen(3000, () => console.log('Listening on port 3000!'));
