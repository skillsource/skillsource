const seed = require('./sampleData/sampleData.js')
const Sequelize = require('sequelize');
const { db_name, db_user, db_password } = require('../config/config');

const sequelize = new Sequelize(db_name, db_user, db_password, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  operatorsAliases: false,
  logging: false,
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
  enrolled: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  }
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
  minutes: Sequelize.INTEGER
});

const UserStep = sequelize.define('userStep', {
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  minutes: Sequelize.INTEGER
});

const Comment = sequelize.define('comment', {
  text: {
    type: Sequelize.STRING
  }
});

const Tag = sequelize.define('tag', {
  name: {
    type: Sequelize.STRING,
    required: true,
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

Comment.hasMany(Comment, { as: 'thread'});

Course.belongsToMany(Tag, { through: 'courseTags' });
Tag.belongsToMany(Course, { through: 'courseTags' });

/// USE THIS TO SEED DB ///////

// sequelize.sync({ force: true }).then(async () => {
//   await User.bulkCreate(seed.sampleUsers);
//   const tags = await Tag.bulkCreate(seed.sampleTags);
//   const courses = await Course.bulkCreate(seed.sampleCourses);
//   await courses[0].addTags([tags[3]]);
//   await courses[1].addTags([tags[0]]);
//   await courses[2].addTags([tags[1]]);
//   await Step.bulkCreate(seed.sampleSteps);
//   await Comment.bulkCreate(seed.sampleComments);
// });

/////////////////////////////

const ratingsCountByCourseId = (courseId) => UserCourse.count({ where: { courseId } });

const updateCourseRating = async(courseId) => {
  const ratingsSum = await UserCourse.sum('rating', { where: { courseId } });
  ratingsCount = await ratingsCountByCourseId(courseId);
  const rating = Math.ceil(ratingsSum / ratingsCount);
  await Course.update({ rating }, { where: { id: courseId } });
};

module.exports = {
  User,
  Course,
  UserCourse,
  Step,
  UserStep,
  Comment,
  Tag,
  updateCourseRating,
  ratingsCountByCourseId,
}
