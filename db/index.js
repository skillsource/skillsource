const Sequelize = require('sequelize');
const { db_name, db_user, db_password } = require('../config/config');

const sequelize = new Sequelize(db_name, db_user, db_password, {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
});

const User = sequelize.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

const Course = sequelize.define('course', {
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  rating: {
    type: Sequelize.INTEGER,
    defaultValue: null,
  },
});

const UserCourse = sequelize.define('userCourse', {
  rating: {
    type: Sequelize.INTEGER,
    defaultValue: null,
  },
});

const Step = sequelize.define('step', {
  ordinalNumber: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  text: Sequelize.STRING,
});

const UserStep = sequelize.define('userStep', {
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

User.hasMany(Course, { as: 'lesson' });
Course.belongsTo(User, { as: 'creator' });

User.belongsToMany(Course, { through: UserCourse });
Course.belongsToMany(User, { through: UserCourse });

Course.hasMany(Step);
Step.belongsTo(Course);

User.belongsToMany(Step, { through: UserStep });
Step.belongsToMany(User, { through: UserStep });

// sequelize.sync();
// sequelize.sync({ force: true });

module.exports.User = User;
module.exports.Course = Course;
module.exports.UserCourse = UserCourse;
module.exports.Step = Step;
module.exports.UserStep = UserStep;
