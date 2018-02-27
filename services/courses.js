const Course = require('../db/index.js').Course;

const get = function(callback) {
  Course.findAll().then((courses) => {
    if (!courses) {
      callback(true);
    } else {
      callback(false, courses);
    }
  })
}

const create = function() {

}

const updateRating = function() {

}

module.exports.get = get;
module.exports.create = create;
module.exports.updateRating = updateRating;