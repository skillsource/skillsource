import React from "react";
import AuthService from "../services/AuthService.js";
import ApiService from "../services/ApiService.js"
import { withRouter } from "react-router-dom";

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
    const enrolled = (<button id="enroll-button" onClick={this.props.handleEnrollment}>Drop Course</button>);
    const notEnrolled = (<button id="enroll-button" onClick={this.props.handleEnrollment}>Enroll in Course</button>);
    const loggedOut = (<div>
          <button id="enroll-button" onClick={this.handleReroute}>Login to enroll</button>
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

export default withRouter(Enroll);