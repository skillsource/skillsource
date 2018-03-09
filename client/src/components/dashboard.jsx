import React from "react";
import Snippet from './snippet.jsx';
import ApiService from '../services/ApiService.jsx';

class Dashboard extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      courses: []
    }
  }

  componentDidMount(){
    ApiService.getEnrollments().then(res => {
      this.setState({courses: res});
    })
  }

  enrolled() {
    ApiService.getEnrollments()
      .then(res => {
        this.setState({
          courses: res
        })
      })
  }

  created() {
    ApiService.getCreatedCourses()
      .then((res) => {
        this.setState({
          courses: res
        });
      })
  }

  completed() {
    ApiService.getCompletedCourses()
      .then((res) => {
        this.setState({
          courses: res
        });
      })
  }

  render(){
    const snippets = this.state.courses.map((course) => {
      return (
        <Snippet
          key={course.id}
          data={course}
        />
      )
    });
    return (
      <div>
        <div className="tab">
          <button id="enrolled" onclick={this.enrolled.bind(this)}>Enrolled</button>
          <button id="created" onclick={this.created.bind(this)}>Created</button>
          <button id="completed" onclick={this.completed.bind(this)}>Completed</button>
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