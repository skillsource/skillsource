const db = require('../index.js');
const Course = require('./course.js');
const User = require('./user.js');

const Comment = db.define('Comment', {
  text: {
    type: Sequelize.STRING
  }
});

// need to add relationship with user_id and course_id
Comment.belongsTo(Course);
Comment.belongsTo(User);

module.exports.Comment = Comment;