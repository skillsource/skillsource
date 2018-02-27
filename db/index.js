const Sequelize = require('sequelize');
const config = require('../config/config.js');

const sequelize = new Sequelize(config.db_name, config.db_user, config.db_password, {
  host: 'localhost',
  dialect: 'mysql'
});

const models = [
  'Course',
  'Comment',
  'User',
  'Step',
  'Users_Courses',
  'Users_Steps'
];

models.forEach(function(model) {
  module.exports[model] = sequelize.import(__dirname + '/models/' + model);
});

sequelize.sync();

exports.db = sequelize;
