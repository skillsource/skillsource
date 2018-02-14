var Sequelize = require('sequelize');

var db = new Sequelize('skillsource_db', 'root', '');

exports.db = db;