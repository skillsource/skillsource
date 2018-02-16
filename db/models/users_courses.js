const Sequelize = require('sequelize');
const User = require('./user.js');
const Course = require('./course.js');

module.exports = function(sequelize, DataTypes) {
  var Users_Courses = sequelize.define('Users_Courses', {
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: null
    }
  }, {
    classMethods: {
      associate: function(models) {
        User.belongsToMany(models.Course, { through: Users_Courses });
        Course.belongsToMany(models.User, { through: Users_Courses });
      }
    }
  });

  return Users_Courses;
}