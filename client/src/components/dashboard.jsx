import React from "react";
import Snippet from './snippet.jsx';
import ApiService from '../services/ApiService.js';

class Dashboard extends React.Component {

  constructor(props){
    super(props);
    this.state={
      courses: []
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
  }

  enrolled() {
    console.log(this.refs.completedButton)
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
    return (
      <div>
        <div className="tab">

        </div>
        <div className="dashboard">
          <h3>You are enrolled in:</h3>
          {snippets}
        </div>
        <div className="completed">
          <h3>You have completed:</h3>
        </div>
      </div>
    );
  }
}

export default Dashboard;