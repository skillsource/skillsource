const Sequelize = require('sequelize');
const Course = require('./course.js');
const User = require('./user.js');

module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
    text: {
      type: Sequelize.STRING
    }
  }, {
    classMethods: {
      associate: function(models) {
        Comment.belongsTo(models.Course);
        Comment.belongsTo(models.User);
      }
    }
  });

  return Comment;
}