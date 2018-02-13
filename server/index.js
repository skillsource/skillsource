const bodyParser = require('body-parser');

const express = require('express');
const app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

const wrap = fn => (...args) => fn(...args).catch(args[2]);

// courses
app.get('/courses', wrap(async (req, res) => {
  const courses = await db.getCourses();
  res.send(courses);
}));

app.get('/courses/:courseId', wrap(async (req, res) => {
  const course = await db.getCourse(req.params.courseId);
  res.send(course);
}))

app.post('/courses', wrap(async (req, res) => {
  const courseId = await db.addCourse(req.body);
  res.send(courseId);
}));

// user-courses
app.get('/user-courses/:userId', wrap(async (req, res) => {
  const userCourses = await db.getUserCourses(req.params.userId)
  res.send(userCourses);
}));

app.post('/user-courses', wrap(async (req, res) => {
  const userCourseId = await db.addUserCourse(req.body)
  res.send(userCourseId);
}));

app.listen(3000, () => console.log('Example app listening on port 3000!'));
