const User = require('../db/models/user.js');

const get = function(userID) {
  User.findById(userID).then((user) => {
    return user;
  })
  .catch((err) => {
    return err;
  });
};

const create = function(userBody) {
  User.create(userBody).then((user) => {
    return user;
  })
  .catch((err) => {
    return err;
  });
}

module.exports.get = get;
module.exports.create = create;