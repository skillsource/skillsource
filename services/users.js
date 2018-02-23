const User = require('../db/models/user').User;

exports.getUserById = (userId) => User.findById(userId);

exports.getUserByEmail = (email) => User.findOne({ where: { email } });

exports.create = (user) => User.create(user);
