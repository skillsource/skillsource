import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <div className="login">
        <h3>Login</h3>
        <form method="post" action="http://localhost:3000/login">
          <div className="input">
            <label>Username: </label>
            <input name="username" id="username" type="text"/>
          </div>
          <div className="input">
            <label>Password: </label>
            <input name="password" id="password" type="password"/>
          </div>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

export default Login;