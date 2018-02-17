const Sequelize = require('sequelize');
const User = require('./user.js');
const Step = require('./step.js');

module.exports = function(sequelize, DataTypes) {
  var Users_Steps = sequelize.define('Users_Steps', {
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        User.belongsToMany(models.Step, { through: Users_Steps });
        Step.belongsToMany(models.User, { through: Users_Steps });
      }
    }
  });

  return Users_Steps;
}