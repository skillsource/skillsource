const db = require('../index.js');
const Course = require('./course.js');
const Comment = require('./comment.js');

const User = db.define('User', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  username: {
    type: Sequelize.STRING,
    unique: true
  },
  password: {
    type: Sequelize.STRING
  }
});

User.hasMany(Course);
User.hasMany(Comment);

// one example of hashing password: https://www.youtube.com/watch?v=pquxHIBx8ks&index=5&list=PL5ze0DjYv5DYBDfl0vF_VRxEu8JdTIHlR
// watch at 6:30

module.exports.User = User;