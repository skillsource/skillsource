import React from "react";
import Snippet from './snippet.jsx';
import ApiService from '../services/ApiService.js';

class Dashboard extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      enrolled: [],
      completed: [],
      created: []
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
      this.setState({enrolled: res});
      return res;
    }).then(async (res) => {
      tmpCourses = this.state.enrolled;
      for(var i = 0; i < tmpCourses.length; i++){
        tmpCourses[i].progress = await this.getPercent(tmpCourses[i].id);
      }
    }).then(()=>{
      this.setState({enrolled: tmpCourses})
    })
  }

  enrolled() {
    ApiService.getEnrollments()
      .then(res => {
        this.setState({
          enrolled: res
        })
      })
  }

  created() {
    ApiService.getCreatedCourses()
      .then((res) => {
        res.id = res.courseId;
        this.setState({
          created: res
        });
      })
  }

  completed() {
    let completed = [];
    this.state.enrolled.forEach((course) => {
      console.log("course:", course)
      ApiService.getUserSteps(course.id)
        .then((responseCourse) => {
          if (responseCourse.completed) {
            completed.push(responseCourse);
          }
          this.setState({
            completed: completed
          });
        })
    })
  }

  render(){
    console.log("this.state:", this.state)
    const snippets = this.state.enrolled.map((course) => {
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
          <button id="enrolled" onClick={this.enrolled.bind(this)}>Enrolled</button>
          <button id="created" onClick={this.created.bind(this)}>Created</button>
          <button id="completed" onClick={this.completed.bind(this)}>Completed</button>
        </div>
        <div className="dashboard">
          <h3>You are enrolled in:</h3>
          {snippets}
        </div>
        <div className="created">
          <h3>You have Created:</h3>

        </div>
        <div className="completed">
          <h3>You have completed:</h3>

        </div>
      </div>
    );
  }
}

export default Dashboard;