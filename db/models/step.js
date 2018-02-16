const Sequelize = require('sequelize');
const Course = require('./course.js');

module.exports = function(sequelize, DataTypes) {
  var Step = sequelize.define('Step', {
    ordinal_number: {
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    text: {
      type: DataTypes.TEXT
    }
  }, {
    classMethods: {
      associate: function(models) {
        Step.belongsTo(models.Course);
      }
    }
  });

  return Step;
}