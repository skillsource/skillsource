const db = require('../db/index');

const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const boom = require('boom');
const cors = require('cors');
const exjwt = require('express-jwt');
const express = require('express');
const jwt = require('jsonwebtoken');
const pssg = require('pssg'); // Google Pagespeed Screenshot API

const app = express();
const wrap = fn => (...args) => fn(...args).catch(args[2]);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(__dirname + '/../client/dist'));
app.use('/favicon.ico', express.static(__dirname + '/../favicon.ico'));
app.use('/screenshots', express.static(__dirname + '/../public/images/'));

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

const unrestricted = [
  { url: '/courses/', methods: ['GET'] },
  { url: /\/courses\/*/, methods: ['GET'] },
  { url: '/steps', methods: ['GET'] },
  { url: '/users', methods: ['POST'] },
  { url: '/comments', methods: ['GET'] },
  { url: '/login', methods: ['POST'] },
  { url: '/tags', methods: ['GET'] },
  { url: /\/screenshots\/*/, methods: ['GET'] },
]
app.use(exjwt({ secret: 'secret' }).unless({ path: unrestricted }));

// courses
app.get('/courses', wrap(async (req, res) => {
  const courses = await db.Course.findAll({ include: [db.Tag, db.Step] });
  res.json(courses);
}));

app.get('/courses/:courseId', wrap(async (req, res) => {
  const { courseId } = req.params;
  const course = await db.Course.findById(courseId, { include: [db.Step, db.Comment] });
  course.dataValues.ratingsCount = await db.ratingsCountByCourseId(courseId);
  res.json(course);
}));

app.post('/courses', wrap(async (req, res) => {
  // expecting course: { name, description, steps, tags }
  // where array steps: [{ ordinalNumber, name, text, url }]
  // doing the work of POST /steps
  const course = { creatorId: req.user.id, ...req.body };
  const newCourse = await db.Course.create(course, { include: db.Step });
  let tagIds = [];
  await asyncForEach(course.tags, async (tag) => {
    if (tag.id) {
      tagIds.push(tag.id);
    } else {
      const newTag = await db.Tag.create(tag);
      tagIds.push(newTag.id);
    }
  })
  const tags = await db.Tag.findAll({ where: { id: tagIds } });
  await newCourse.addTags(tags);
  res.json(newCourse);

  /// Retrieve and save screenshots
  newCourse.steps.forEach((step) => {
    pssg.download(step.url, {
      dest: __dirname + '/../public/images/',
      filename: step.id
    }).then((file) => {
      console.log('Screenshot saved to' + file + '.')
    });
  })
}));

app.get('/users/createdCourses', wrap(async (req, res) => {
  const userId = req.user.id;
  const creatorId = userId;
  const user = await db.User.findById(userId);
  const userCourses = await db.Course.findAll({ where: { creatorId } });
  res.json({
    courses: userCourses
  });
}));

// enrollments
app.get('/enrollments', wrap(async (req, res) => {
  const userId = req.user.id;
  const user = await db.User.findById(userId);
  const enrollments = await user.getCourses({include: [{model: db.Step}]});
  const filtered = enrollments.filter((course) => {
    return course.userCourse.enrolled === true;
  })
  res.json(filtered);
}));

app.post('/enrollments', wrap(async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user.id;
  const user = await db.User.findById(userId);
  const course = await db.Course.findById(courseId, { include: db.Step });
  const userCourse = await db.UserCourse.findOne({ where: { userId, courseId } });

  if (userCourse) {
    userCourse.update({ enrolled: !userCourse.enrolled });
  } else {
    try {
      await user.addCourse(courseId);
      // doing the work of POST /user-steps
      await user.addSteps(course.steps);
    } catch(err) {
      throw boom.badRequest('User already enrolled in this course');
    }
  }
  res.json(course);
}));

app.patch('/enrollments/rating', wrap(async (req, res) => {
  const { courseId, rating } = req.body;
  const userId = req.user.id;
  await db.UserCourse.update({ rating }, { where: { userId, courseId } });
  const updatedUserCourse = await db.UserCourse.findOne({ where: { userId, courseId } });
  await db.updateCourseRating(courseId);
  res.json(updatedUserCourse);
}));

// steps
app.get('/steps', wrap(async (req, res) => {
  const { courseId } = req.query;
  const course = await db.Course.findById(courseId);
  const steps = await course.getSteps();
  res.json(steps);
}));

// userSteps
app.get('/user-steps', wrap(async (req, res) => {
  const { courseId } = req.query;
  const user = await db.User.findById(req.user.id);
  const userSteps = await user.getSteps({ where: { courseId } });
  res.json(userSteps);
}));

app.patch('/user-steps', wrap(async (req, res) => {
  const userId = req.user.id;
  const { stepId, completed } = req.query;
  await db.UserStep.update({ completed }, { where: { userId, stepId } });
  const updatedUserStep = await db.UserStep.findOne({ where: { userId, stepId } });
  res.json(updatedUserStep);
}));

// users
app.get('/users', wrap(async (req, res) => {
  const user = await db.User.findById(req.user.id);
  if (!user) throw boom.notFound('Cannot locate user by supplied userId');
  res.json(user);
}));

app.post('/users', wrap(async (req, res) => {
  const { username, email, password } = req.body;
  const user = await db.User.findOne({ where: { email } });
  if (user) throw boom.badRequest('Email already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await db.User.create({ username, email, password: hashedPassword });
  res.json(newUser);
}));

// comments
app.get('/comments', wrap(async (req, res) => {
  const { courseId } = req.query;
  console.log(req.query);
  const course = await db.Course.findById(courseId);
  const comments = await course.getComments({
    where: {commentId: null},
    include: [{model: db.User}, { model: db.Comment, as: 'thread',
      include: {model: db.User}
    }]
  });
  res.json(comments);
}));

app.post('/comments', wrap(async (req, res) => {
  const userId = req.user.id;
  const { courseId, text, commentId } = req.body;
  const comment = await db.Comment.create({ userId, courseId, text, commentId });
  const newComment = await db.Comment.findById(comment.id, { include: db.User });
  res.send(newComment);
}));

// tags
app.get('/tags', wrap(async (req, res) => {
  const tags = await db.Tag.findAll();
  res.json(tags);
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
  res.json(token);
}));

app.use((err, req, res, next) => {
  console.log(err);
  if (err.isBoom) {
    const { payload } = err.output;
    res.status(payload.statusCode).json(payload);
  } else if (err.name === 'UnauthorizedError') {
    if (!req.user) res.status(401).json('Invalid jwt');
  } else {
    res.status(500).json('Whoops! Something went wrong. Check the server logs.');
  }
});

app.listen(3000, () => console.log('Listening on port 3000!'));
