import React from "react";
import AuthService from "./AuthService.jsx";
import ApiService from "../services/ApiService.jsx"

class Enroll extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      enrolled: false;
    };
  }

  componentWillMount() {
    const enrolledCourses = ApiService.getEnrollments();
    for (var i = 0; i < enrolledCourses.length, i++) {
      if (this.props.courseId === enrolledCourses[i].courseId) {
        this.setState({
          enrolled: true
        })
      }
    }
  }

  handleEnrollment = () => {
    this.setState({
      enrolled: !this.state.enrolled
    }, () => {
      ApiService.changeEnrollment(this.props.courseId)
    })
  }

  handleReroute = () => {
    this.props.history.replace("/login")
  }

  render(){
    const enrolled = (<button onClick={this.handleEnrollment}>Drop Course.</button>);
    const notEnrolled = (<button onClick={this.handleEnrollment}>Enroll in Course</button>);
    const loggedOut = (<button>Enroll</button>
          <p>Sign up or login to enroll in this course.<p>);

    if (!AuthService.loggedIn()) {
      return loggedOut;
    } else if (this.state.enrolled) {
      return enrolled;
    } else {
      return notEnrolled;
    }
  }
}

export default Enroll;