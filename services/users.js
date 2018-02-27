const User = require('../db/index.js').User;

const get = function(userID, callback) {
  User.findById(userID).then((user) => {
    if (!user) {
      callback(true)
    } else {
      callback(false, user);
    }
  })
  .catch((err) => {
    callback(true);
  });
};

const create = function(userBody, callback) {
  User.sync()
  .then(function(){
    return User.create(userBody)}).then((user) => {
    callback(false, user);
  })
  .catch((err) => {
    callback(true);
  });
}

module.exports.get = get;
module.exports.create = create;