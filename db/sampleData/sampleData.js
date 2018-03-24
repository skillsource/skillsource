const users = [
  {
    email: 'magee@magee.com',
    username: 'Magee',
    password: '123',
    creatorEmail: false,
    reminderEmail: false,
  },
  {
    email: 'kate@kate.com',
    username: 'Kate',
    password: '123',
    creatorEmail: false,
    reminderEmail: false,
  },
  {
    email: 'nick@nick.com',
    username: 'Nick',
    password: '123',
    creatorEmail: false,
    reminderEmail: false,
  },
  {
    email: 'bella@bella.com',
    username: 'Bella',
    password: '123',
    creatorEmail: false,
    reminderEmail: false,
  },
  {
    email:'shelldog42@gmail.com',
    username: 'Michelle',
    password: 'chickenface',
    creatorEmail: false,
    reminderEmail: true,
  }
];

const courses = [
  {
    creatorId: 1,
    name: 'Learn Javascript',
    description: 'Learn vanilla JS in 30 days or less.',
  },
  {
    creatorId: 1,
    name: 'Swim like Michael Phelps',
    description: 'Master the techniques perfected by the master of swim.'
  },
  {
    creatorId: 1,
    name: 'Play the ukelele',
    description: 'Learn how to play the uke through youtube videos, perfectly ordered by level of difficulty.'
  }
]

const steps = [
  {
    ordinalNumber: 0,
    name: 'Learn the basics',
    text: 'Code Academy does a great job teaching you the basics. Start here.',
    url: 'https://www.codecademy.com/en/tracks/javascript',
    courseId: 1,
    minutes: 5000
  },
  {
    ordinalNumber: 1,
    name: 'Build your first app with Gordon Zhu',
    text: 'Now that you\'ve learned the basics, let\'s get a taste of web enginering. Gordon\'s course does a great job walking you through building a ToDo list app' ,
    url: 'https://watchandcode.com/p/practical-javascript',
    courseId: 1,
    minutes: 25000
  },
  {
    ordinalNumber: 2,
    name: 'Download React',
    text: 'Congrats, you\'re a senior software engineer now. Go download React and change the world',
    url: 'https://reactjs.org/',
    courseId: 1,
    minutes: 5
  },
  {
    ordinalNumber: 0,
    name: 'Work on your kick',
    text: 'Leg kick technique is often misunderstood by swimmers and triathletes. This article from SwimSmooth.com does a great job breaking it down and is a good place to start.',
    url: 'http://www.swimsmooth.com/kick.html',
    courseId: 2,
    minutes: 60000
  },
  {
    ordinalNumber: 1,
    name: 'Learn how to breath efficiently',
    text: 'Breathing is important when you swim. Watch this great youtube video.',
    url: 'https://www.youtube.com/watch?v=TbFqsEFrCB4',
    courseId: 2,
    minutes: 60
  },
  {
    ordinalNumber: 2,
    name: 'Master the flip turn',
    text: 'The faster you turn, the faster you go.',
    url: 'https://www.youtube.com/watch?v=FDM-WuklAqc',
    courseId: 2,
    minutes: 120
  },
  {
    ordinalNumber: 0,
    name: 'Pick your instrument',
    text: 'Choosing the right ukelele can be tough. Here are a few things to consider',
    url: 'https://www.ukuleletricks.com/5-best-ukuleles-to-buy-for-beginners/',
    courseId: 3,
    minutes: 240
  },
  {
    ordinalNumber: 1,
    name: 'Get your uke tuned',
    text: 'For this course we\'re going to use G, C, E, A tuning. Watch this youtube video for step by step instructions',
    url: 'https://www.ukuleletricks.com/ukulele-tuning-how-to-tune-your-ukulele/',
    courseId: 3,
    minutes: 10
  },
  {
    ordinalNumber: 2,
    name: 'Practice your first song',
    text: 'I know, you just want to play \'Somewhere Over The Rainbow\' but let\'s start with something a little simpler to build up our skills',
    url: 'https://www.youtube.com/watch?v=C7cPKXfI4CM',
    courseId: 3,
    minutes: 500
  }
]

const comments = [
  {
    userId: 1,
    courseId: 1,
    text: 'What a great class. Continue your studies at Hack Reactor!'
  },
  {
    userId: 2,
    courseId: 1,
    text: 'But I want to learn Python. :-('
  },
  {
    userId: 3,
    courseId: 1,
    text: 'You should create a Python course then?',
    commentId: 2
  },
  {
    userId: 2,
    courseId: 1,
    text: 'I just want it to appear like magic!',
    commentId: 2
  },
  {
    userId: 2,
    courseId: 2,
    text: 'Swim code swim code swim code swim code. '
  },
  {
    userId: 1,
    courseId: 2,
    text: 'Phelps. What a great Olympian. The best?'
  },
  {
    userId: 4,
    courseId: 2,
    text: 'I took this course and I\'m faster than Phelps now. Great course. Highly recommended.'
  },
  {
    userId: 3,
    courseId: 3,
    text: 'Ukes are awesome. This course is awesome.',
  },
  {
    userId: 2,
    courseId: 3,
    text: 'Will this course teach me how to play Free Bird?',
  }
]

const tags = [
  {
    name: 'sports'
  },
  {
    name: 'music'
  },
  {
    name: 'cooking'
  },
  {
    name: 'coding'
  }
]

module.exports.sampleCourses = courses;
module.exports.sampleUsers = users;
module.exports.sampleSteps = steps;
module.exports.sampleComments = comments;
module.exports.sampleTags = tags;
