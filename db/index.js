var Sequelize = require('sequelize');

var db = new Sequelize('skillsource_db', 'root', '', {
  dialect: 'mysql'
});

/* in server/index.js

db.sync()
  .then(() => {
    console.log("db is synced");
  });

*/
exports.db = db;