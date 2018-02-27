import React, { Component } from 'react';
import AuthService from './AuthService.jsx';

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

  render() {
    return (
      <div className="center">
        <div className="card">
          <h1>Login</h1>
          <form>
            <input
              className="form-item"
              placeholder="Username goes here..."
              name="username"
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

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();

    this.Auth.login(this.state.username, this.state.password)
      .then(res => {
        console.log("res:", res)
        this.props.history.replace('/');
      })
      .catch(err =>
        console.error('err in handleFormSubmit', err)
      );
  }
}

export default Login;