const Sequelize = require('sequelize');
const User = require('./user.js');
const Step = require('./step.js');

module.exports = function(sequelize, DataTypes) {
  var Course = sequelize.define('Course', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: null
    }
  }, {
    classMethods: {
      associate: function(models) {
        Course.belongsTo(models.User);
        Course.belongsTo(models.Step);
      }
    }
  });

  return Course;
}