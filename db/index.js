const seed = require('./sampleData/sampleData.js')
const Sequelize = require('sequelize');
const { db_name, db_user, db_password } = require('../config/config');

const sequelize = new Sequelize(db_name, db_user, db_password, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  operatorsAliases: false,
  logging: false
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
  url: Sequelize.STRING,
});

const UserStep = sequelize.define('userStep', {
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

const Comment = sequelize.define('comment', {
  text: {
    type: Sequelize.STRING
  }
});

Course.belongsTo(User, { as: 'creator' });

User.belongsToMany(Course, { through: UserCourse });
Course.belongsToMany(User, { through: UserCourse });

Step.belongsTo(Course);
Course.hasMany(Step);

User.belongsToMany(Step, { through: UserStep });
Step.belongsToMany(User, { through: UserStep });

Comment.belongsTo(User);
User.hasMany(Comment);

Comment.belongsTo(Course);
Course.hasMany(Comment);

///// USE THIS TO SEED DB ///////

// sequelize.sync({ force: true }).then(() => {
//   const sampleUsers = User.bulkCreate(seed.sampleUsers);
//   const sampleCourses = Course.bulkCreate(seed.sampleCourses);
//   const sampleSteps = Step.bulkCreate(seed.sampleSteps);
// })

///////////////////////////////



const updateCourseRating = async(courseId) => {
  const ratingsSum = await UserCourse.sum('rating', { where: { courseId } });
  const ratingsCount = await UserCourse.count({ where: { courseId } });
  const rating = Math.ceil(ratingsSum / ratingsCount);
  await Course.update({ rating }, { where: { id: courseId } });
};

module.exports.User = User;
module.exports.Course = Course;
module.exports.UserCourse = UserCourse;
module.exports.Step = Step;
module.exports.UserStep = UserStep;
module.exports.Comment = Comment;
module.exports.updateCourseRating = updateCourseRating;
