import React from "react";
import AuthService from "../services/AuthService.jsx";
import ApiService from "../services/ApiService.jsx"

class Enroll extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      enrolled: false
    };
  }

  handleReroute = () => {
    this.props.history.replace("/login")
  }

  render(){
    const enrolled = (<button onClick={this.props.handleEnrollment}>Drop Course.</button>);
    const notEnrolled = (<button onClick={this.props.handleEnrollment}>Enroll in Course</button>);
    const loggedOut = (<div>
          <button>Enroll</button>
          <p>Sign up or login to enroll in this course.</p>
          </div>);

    if (!this.props.loggedIn) {
      return loggedOut;
    } else if (this.props.enrolled) {
      return enrolled;
    } else {
      return notEnrolled;
    }
  }
}

export default Enroll;