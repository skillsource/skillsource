import React from "react";
import Snippet from './snippet.jsx';
import ApiService from '../services/ApiService.js';
import AuthService from '../services/AuthService.js';

class Dashboard extends React.Component {

  constructor(props){
    super(props);
    this.state={
      courses: [],
      user: {
        username: '',
      }
    }
  }

  getPercent(courseId){
    var stepsComplete = 0;
    var totalSteps = 0;
    var percent = 0;
    return ApiService.getUserSteps(courseId).then(res=>{
      totalSteps = res.length;
      for(var i = 0; i < res.length; i++){
        if(res[i].userStep.completed){
          stepsComplete++;
        }
      }
      percent = Math.round((stepsComplete/totalSteps) * 100);
      return percent;
    })
  }

  componentDidMount(){
    var tmpCourses = [];
    ApiService.getEnrollments().then(res => {
      this.setState({courses: res});
      return res;
    }).then(async (res) => {
      tmpCourses = this.state.courses
      for(var i = 0; i < tmpCourses.length; i++){
        tmpCourses[i].progress = await this.getPercent(tmpCourses[i].id);
      }
    }).then(()=>{
      this.setState({courses: tmpCourses})
    })
    ApiService.getUser().then((user) => {
      console.log('user return', user)
      this.setState({ user });
    })
  }

  handleClick = () => {
    this.props.history.replace('/courses')
  }

  render(){
    const snippets = this.state.courses.map((course) => {
      return (
        <Snippet
          key={course.id}
          data={course}
          progress={course.progress} />
      )
    });

    if (this.state.courses.length === 0) {
      return (
        <div className="dashboard">
          <h3>Welcome to Skillsource, {this.state.user.username}!</h3>
          <div className='no-course' onClick={this.handleClick}>
          <p>You are not enrolled in any courses.</p>
          </div>
        </div>
      )
    } else {
      return (
        <div className="dashboard">
            <h3>You are enrolled in:</h3>
            {snippets}
        </div>
      );
    }

  }
}

export default Dashboard;