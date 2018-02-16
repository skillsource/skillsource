import React, { Component } from "react";
import CreateStep from './createStep.jsx';

class Login extends Component {
  render() {
    return (
      <div className="create">
        <h3>Create a course:</h3>
        <form method="post" action="http://localhost:3000/courses">
          <div className="input">
            <label>Course Name: </label>
            <input name="name" id="name" type="text"/>
          </div>
          <CreateStep />
          <CreateStep />
          <CreateStep />
          <CreateStep />
          <input type="submit" value="Add a step"/>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

export default Login;