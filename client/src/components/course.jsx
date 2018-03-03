import React from "react";
import Step from './step.jsx';

class Course extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      courseData: ''
    };
  }

  componentDidMount(){
    const courseId = this.props.match.params.id;
    console.log('courseId>>>', courseId)
    fetch(`http://localhost:3000/courses/${courseId}`,
    {
      method: 'GET',
      headers: {
     'Authorization': 'Bearer '+ localStorage.id_token
      }
    }).then((res)=>{
      return res.json();
    }).then((res)=>{
      console.log('res after json~~', res)
      this.setState({courseData: res})
    })
  }

  render(){
    console.log('the steps! >>>', this.state.courseData.steps)
    return (
      <div className="course-view">
          <h3>{this.state.courseData.name}</h3>
          <h4>Rating: {this.state.courseData.rating}</h4>
          <p>Description: {this.state.courseData.description}</p>
          {
            (this.state.courseData.steps === undefined) ?
              <div>appleee</div>
            :
            this.state.courseData.steps.map((step)=>{
              return <Step key={step.id} data={step} />
            })
           
          }
      </div>
    );
  }
}

export default Course;

//SAMPLE DATA FOR SETTING UP BASIC FRONTEND. TO BE REMOVED//
  // const sampleData = {
  //       '1': {
  //         id: 1,
  //         name: 'Learn Javascript',
  //         description: 'Learn vanilla JS in 30 days or less.',
  //         rating: '*****',
  //         steps: [
  //           {
  //             id: 1,
  //             name: 'Learn the basics',
  //             description: 'Code Academy does a great job teaching you the basics. Start here.',
  //             resource: 'https://www.codecademy.com/en/tracks/javascript'
  //           },
  //           {
  //             id: 2,
  //             name: 'Build your first app with Gordon Zhu',
  //             description: 'Now that you\'ve learned the basics, let\'s get a taste of web enginering. Gordon\'s course does a great job walking you through building a ToDo list app' ,
  //             resource: 'https://watchandcode.com/p/practical-javascript'
  //           },
  //           {
  //             id: 3,
  //             name: 'Download React',
  //             description: 'Congrats, you\'re a senior software engineer now. Go download React and change the world',
  //             resource: 'https://reactjs.org/'
  //           }
  //         ]
  //       },
  //       '2': {
  //         id: 2,
  //         name: 'Swim like Michael Phelps',
  //         description: 'Master the techniques perfected by the master of swim.',
  //         rating: '*****',
  //         steps: [
  //           {
  //             id: 1,
  //             name: 'Work on your kick',
  //             description: 'Kicking is important when you swim',
  //             resource: 'bla'
  //           },
  //           {
  //             id: 2,
  //             name: 'Learn how to breath efficiently',
  //             description: 'Breathing is important when you swim. Watch this great youtube video.',
  //             resource: 'http://youtube.com/tuningukesforbeginners/'
  //           },
  //           {
  //             id: 3,
  //             name: 'Master the flip turn',
  //             description: 'The faster you turn, the faster you go.',
  //             resource: 'http://youtube.com/YourFirstUkeSong/'
  //           }
  //         ]
  //       },
  //       '3': {
  //         id: 3,
  //         name: 'Play the ukelele',
  //         description: 'Learn how to play the uke through youtube videos, perfectly ordered by level of difficulty.',
  //         rating: '***',
  //         steps: [
  //           {
  //             id: 1,
  //             name: 'Pick your instrument',
  //             description: 'Choosing the right ukelele can be tough. Here are a few things to consider',
  //             resource: 'https://www.ukuleletricks.com/5-best-ukuleles-to-buy-for-beginners/'
  //           },
  //           {
  //             id: 2,
  //             name: 'Get your uke tuned',
  //             description: 'For this course we\'re going to use G, C, E, A tuning. Watch this youtube vid for step by step instructions',
  //             resource: 'https://takelessons.com/blog/how-to-tune-a-ukulele-beginners-z10'
  //           },
  //           {
  //             id: 3,
  //             name: 'Practice your first song',
  //             description: 'I know, you just want to play \'Somewhere Over The Rainbow\' but let\'s start with something a little simpler to build up our skills',
  //             resource: 'https://www.youtube.com/watch?v=C7cPKXfI4CM'
  //           }
  //         ]
  //       }
  //     }
//SAMPLE DATA ABOVE. TO BE REMOVED//