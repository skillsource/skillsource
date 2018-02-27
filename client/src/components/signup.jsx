import React, { Component } from "react";
import AuthService from './AuthService.jsx';

class Signup extends Component {
  constructor() {
    super();
    this.auth = AuthService;
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();

    const { username, password, email } = this.state;

    this.auth.signup(username, password, email)
      .then(res => {
        this.props.history.replace('/');
      })
      .catch(err =>
        console.error(err)
      );
  }

  render() {
    return (
      <div className="signup">
        <h3>Get your Skillsource account.</h3>
        <form>
          <div className="input">
            <label>Username: </label>
            <input name="username" id="username" type="text" onChange={this.handleChange} />
          </div>
          <div className="input">
            <label>Email: </label>
            <input name="email" id="email" type="text" onChange={this.handleChange} />
          </div>
          <div className="input">
            <label>Password: </label>
            <input name="password" id="password" type="password" onChange={this.handleChange} />
          </div>
          <button onClick={this.handleFormSubmit}>SUBMIT</button>
        </form>
      </div>
    );
  }
}

export default Signup;