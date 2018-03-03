import React from "react";
import ReactStars from 'react-stars';
import Step from './step.jsx';

const Course = (props) => {
  const courseId = props.match.params.id;
  const course = sampleData[courseId];
  const { steps, name, rating, description } = course;

  return (
    <div className="course-view">
      <h3>{name}</h3>
      <ReactStars value={rating} size={20} edit={false}/>
      <p>{description}</p>
      {steps.map(step => <Step key={step.id} data={step}/>)}
    </div>
  );
}

export default Course;

//SAMPLE DATA FOR SETTING UP BASIC FRONTEND. TO BE REMOVED//
  const sampleData = {
        '1': {
          id: 1,
          name: 'Learn Javascript',
          description: 'Learn vanilla JS in 30 days or less.',
          rating: 5,
          steps: [
            {
              id: 1,
              name: 'Learn the basics',
              description: 'Code Academy does a great job teaching you the basics. Start here.',
              resource: 'https://www.codecademy.com/en/tracks/javascript'
            },
            {
              id: 2,
              name: 'Build your first app with Gordon Zhu',
              description: 'Now that you\'ve learned the basics, let\'s get a taste of web enginering. Gordon\'s course does a great job walking you through building a ToDo list app' ,
              resource: 'https://watchandcode.com/p/practical-javascript'
            },
            {
              id: 3,
              name: 'Download React',
              description: 'Congrats, you\'re a senior software engineer now. Go download React and change the world',
              resource: 'https://reactjs.org/'
            }
          ]
        },
        '2': {
          id: 2,
          name: 'Swim like Michael Phelps',
          description: 'Master the techniques perfected by the master of swim.',
          rating: 4,
          steps: [
            {
              id: 1,
              name: 'Work on your kick',
              description: 'Kicking is important when you swim',
              resource: 'bla'
            },
            {
              id: 2,
              name: 'Learn how to breath efficiently',
              description: 'Breathing is important when you swim. Watch this great youtube video.',
              resource: 'http://youtube.com/tuningukesforbeginners/'
            },
            {
              id: 3,
              name: 'Master the flip turn',
              description: 'The faster you turn, the faster you go.',
              resource: 'http://youtube.com/YourFirstUkeSong/'
            }
          ]
        },
        '3': {
          id: 3,
          name: 'Play the ukelele',
          description: 'Learn how to play the uke through youtube videos, perfectly ordered by level of difficulty.',
          rating: 3,
          steps: [
            {
              id: 1,
              name: 'Pick your instrument',
              description: 'Choosing the right ukelele can be tough. Here are a few things to consider',
              resource: 'https://www.ukuleletricks.com/5-best-ukuleles-to-buy-for-beginners/'
            },
            {
              id: 2,
              name: 'Get your uke tuned',
              description: 'For this course we\'re going to use G, C, E, A tuning. Watch this youtube vid for step by step instructions',
              resource: 'https://takelessons.com/blog/how-to-tune-a-ukulele-beginners-z10'
            },
            {
              id: 3,
              name: 'Practice your first song',
              description: 'I know, you just want to play \'Somewhere Over The Rainbow\' but let\'s start with something a little simpler to build up our skills',
              resource: 'https://www.youtube.com/watch?v=C7cPKXfI4CM'
            }
          ]
        }
      }
//SAMPLE DATA ABOVE. TO BE REMOVED//