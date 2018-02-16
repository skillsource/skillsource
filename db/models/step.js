const db = require('../index.js');
const Course = require('./course.js');

const Step = db.define('Step', {
  ordinal_number: {
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING
  },
  text: {
    type: Sequelize.TEXT
  }
});

// needs a relationship with course for course_id
Step.belongsTo(Course);

module.exports.Step = Step;