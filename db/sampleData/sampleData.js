const users = [
  {
    email: 'magee@magee.com',
    username: 'Magee',
    password: '123'
  },
  {
    email: 'kate@kate.com',
    username: 'Kate',
    password: '123'
  },
  {
    email: 'nick@nick.com',
    username: 'Nick',
    password: '123'
  },
  {
    email: 'bella@bella.com',
    username: 'Bella',
    password: '123'
  },
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
    description: 'Learn how to play the uke through youtube vordinalNumbereos, perfectly ordered by level of difficulty.',
    steps: [

    ]
  }
]

const steps = [
  {
    ordinalNumber: 0,
    name: 'Learn the basics',
    description: 'Code Academy does a great job teaching you the basics. Start here.',
    url: 'https://www.codecademy.com/en/tracks/javascript',
    courseId: 1
  },
  {
    ordinalNumber: 1,
    name: 'Build your first app with Gordon Zhu',
    description: 'Now that you\'ve learned the basics, let\'s get a taste of web enginering. Gordon\'s course does a great job walking you through building a ToDo list app' ,
    url: 'https://watchandcode.com/p/practical-javascript',
    courseId: 1
  },
  {
    ordinalNumber: 2,
    name: 'Download React',
    description: 'Congrats, you\'re a senior software engineer now. Go download React and change the world',
    url: 'https://reactjs.org/',
    courseId: 1
  },
  {
    ordinalNumber: 0,
    name: 'Work on your kick',
    description: 'Kicking is important when you swim',
    url: 'bla',
    courseId: 2
  },
  {
    ordinalNumber: 1,
    name: 'Learn how to breath efficiently',
    description: 'Breathing is important when you swim. Watch this great youtube vordinalNumbereo.',
    url: 'http://youtube.com/tuningukesforbeginners/',
    courseId: 2
  },
  {
    ordinalNumber: 2,
    name: 'Master the flip turn',
    description: 'The faster you turn, the faster you go.',
    url: 'http://youtube.com/YourFirstUkeSong/',
    courseId: 2
  },
  {
    ordinalNumber: 0,
    name: 'Pick your instrument',
    description: 'Choosing the right ukelele can be tough. Here are a few things to consordinalNumberer',
    url: 'https://www.ukuleletricks.com/5-best-ukuleles-to-buy-for-beginners/',
    courseId: 3
  },
  {
    ordinalNumber: 1,
    name: 'Get your uke tuned',
    description: 'For this course we\'re going to use G, C, E, A tuning. Watch this youtube vordinalNumber for step by step instructions',
    url: 'https://takelessons.com/blog/how-to-tune-a-ukulele-beginners-z10',
    courseId: 3
  },
  {
    ordinalNumber: 2,
    name: 'Practice your first song',
    description: 'I know, you just want to play \'Somewhere Over The Rainbow\' but let\'s start with something a little simpler to build up our skills',
    url: 'https://www.youtube.com/watch?v=C7cPKXfI4CM',
    courseId: 3
  }


]

module.exports.sampleCourses = courses;
module.exports.sampleUsers = users;
module.exports.sampleSteps = steps;