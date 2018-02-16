const Sequelize = require('sequelize');
const Course = require('./course.js');
const Comment = require('./comment.js');

// // one example of hashing password: https://www.youtube.com/watch?v=pquxHIBx8ks&index=5&list=PL5ze0DjYv5DYBDfl0vF_VRxEu8JdTIHlR
// // watch at 6:30

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Course);
        User.hasMany(models.Comment);
      }
    }
  });

  return User;
}