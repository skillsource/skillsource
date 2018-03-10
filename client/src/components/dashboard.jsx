import React from "react";
import Snippet from './snippet.jsx';
import ApiService from '../services/ApiService.js';

class Dashboard extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      enrolled: [],
      courses: [],
      currentTab: 'enrolled'
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
      this.setState({
        enrolled: res,
        courses: res
      });
      return res;
    }).then(async (res) => {
      tmpCourses = this.state.courses;
      for(var i = 0; i < tmpCourses.length; i++){
        tmpCourses[i].progress = await this.getPercent(tmpCourses[i].id);
      }
    }).then(()=>{
      this.setState({
        courses: tmpCourses
      });
    })
  }

  enrolled() {
    ApiService.getEnrollments()
      .then(res => {
        this.setState({
          enrolled: res,
          courses: res
        })
      })
  }

  created() {
    ApiService.getCreatedCourses()
      .then((res) => {
        res.id = res.courseId;
        this.setState({
          courses: res.courses,
          currentTab: 'created'
        });
      })
  }

  completed() {
    let completed = [];
    this.state.enrolled.forEach((course) => {
      ApiService.getUserSteps(course.id)
        .then((userSteps) => {
          let numOfSteps = userSteps.length;
          let stepsCompleted = 0;
          userSteps.forEach((step) => {
            if (step.userStep.completed) {
              stepsCompleted++;
            }
            if (numOfSteps === stepsCompleted) {
              completed.push(course);
            }
          });
          this.setState({
            courses: completed,
            currentTab: 'completed'
          });
        })
    })
  }

  render(){
    console.log("this.state:", this.state)
    const snippets = this.state.courses.map((course) => {
      return (
        <Snippet
          key={course.id}
          data={course}
          progress={course.progress} />
      )
    });

    let courses;

    if (this.state.currentTab === 'enrolled') {
      courses = (
          <div className="dashboard">
            <h3>You are enrolled in:</h3>
            {snippets}
          </div>
        )
    } else if (this.state.currentTab === 'created') {
      courses = (
          <div className="created">
            <h3>You have Created:</h3>
            {snippets}
          </div>
        )
    } else {
      courses = (
          <div className="completed">
            <h3>You have completed:</h3>
            {snippets}
          </div>
        )
    }

    return (
      <div>
        <div className="tab">
          <button id="enrolled" onClick={this.enrolled.bind(this)}>Enrolled</button>
          <button id="created" onClick={this.created.bind(this)}>Created</button>
          <button id="completed" onClick={this.completed.bind(this)}>Completed</button>
        </div>
        <div>
          { courses }
        </div>
      </div>
    );
  }
}

export default Dashboard;