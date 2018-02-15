const User = require('../db/models/user.js');

const get = function() {
  User.find();
};

module.exports.get = get;