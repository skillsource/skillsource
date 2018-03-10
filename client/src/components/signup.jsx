import React, { Component } from "react";
import AuthService from '../services/AuthService.js';

class Signup extends Component {
  constructor() {
    super();
    this.auth = AuthService;
    this.state = {
      error: false
    }
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
        this.auth.login(email, password);
      })
      .then((res) => {
        this.setState({error: false})
        this.props.history.replace('/courses')
      })
      .catch(err => {
        this.setState({error: true})
        console.error(err)
      });
  }

  render() {
    return (
      <div className="signup">
        <h3>Get your Skillsource account.</h3>
          <div className="input">
            <input name="username" placeholder="Username" type="text" onChange={this.handleChange} />
          </div>
          <div className="input">
            <input name="email" placeholder="E-mail" type="text" autoComplete="email" onChange={this.handleChange} />
          </div>
          <div className="input">
            <input name="password" placeholder="Password" type="password" autoComplete="current-password" onChange={this.handleChange} />
          </div>
          <button onClick={this.handleFormSubmit}>SUBMIT</button>
          {
            this.state.error
            ? <div>Email already exists</div>
            : <div></div>
          }
      </div>
    );
  }
}

export default Signup;