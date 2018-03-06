import React, { Component } from 'react';
import AuthService from '../services/AuthService.js';

class Login extends Component {
  constructor(){
    super();
    this.Auth = AuthService;
  }

  componentWillMount() {
    if (AuthService.loggedIn()) {
      this.props.history.replace('/');
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();

    this.Auth.login(this.state.email, this.state.password)
      .then(() => this.props.history.replace('/dashboard'))
      .catch(err => console.error('err in handleFormSubmit', err));
  }

  render() {
    return (
      <div className="center">
        <div className="card">
          <h3>Login</h3>
          <form>
            <input
              className="form-item"
              placeholder="Email"
              name="email"
              type="text"
              autoComplete="email"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              placeholder="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              onChange={this.handleChange}
            />
            <button onClick={this.handleFormSubmit}>SUBMIT</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
