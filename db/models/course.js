const db = require('../index.js');

const Course = db.define('Course', {
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  rating: {
    type: Sequelize.INTEGER
  }
});

// needs relationship with user for user_id
Course.hasMany(Step);

module.exports.Course = Course;