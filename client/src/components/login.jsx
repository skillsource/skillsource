import React, { Component } from 'react';
import AuthService from './AuthService.jsx';

class Login extends Component {
  constructor(){
    super();
    this.Auth = AuthService;
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) {
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
      .then(res => {
        this.props.history.replace('/');
      })
      .catch(err =>
        console.error('err in handleFormSubmit', err)
      );
  }

  render() {
    return (
      <div className="center">
        <div className="card">
          <h1>Login</h1>
          <form>
            <input
              className="form-item"
              placeholder="Email goes here..."
              name="email"
              type="text"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              placeholder="Password goes here..."
              name="password"
              type="password"
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