import React, { Component } from "react";

class Signup extends Component {
  render() {
    return (
      <div className="signup">
        <h3>Get your Skillsource account.</h3>
        <form method="post" action="http://localhost:3000/signup">
          <div className="input">
            <label>Username: </label>
            <input name="username" id="username" type="text"/>
          </div>
          <div className="input">
            <label>Email: </label>
            <input name="email" id="email" type="text"/>
          </div>
          <div className="input">
            <label>Password: </label>
            <input name="password" id="password" type="password"/>
          </div>
          <div className="input">
            <label>Confirm password: </label>
            <input name="confirm" id="confirm" type="password"/>
          </div>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

export default Signup;