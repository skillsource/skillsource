import React, { Component } from 'react';
import axios from 'axios';
import AuthService from '../services/AuthService.js'

class Settings extends Component {
  constructor(props) {
    super(props);
    this.auth = AuthService;
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  changePassword = (password, userId) => {
    this.auth.updatePassword(password, userId)
      .then(res => {
        console.log(res);
        this.setState({
          email: '',
          newPassword1: '',
          newPassword2: ''
        }, () => alert('your password has been updated'));
      })
      .catch(err => {
        console.log(err);
        alert('your password was not updated');
      })
  }

  changeEmail = (email, userId) => {
    this.auth.updateEmail(email, userId)
      .then(res => {
        console.log(res)
        this.setState({
          email: '',
          newPassword1: '',
          newPassword2: ''
        }, () => alert('your email has been updated'));
      })
      .catch(err => {
        console.log(err);
        alert('your email has not been updated');
      });       
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, newPassword1, newPassword2 } = this.state;
    const userId = this.auth.getProfile().id;
    if (!userId) {
      alert('You are not logged in!');
      return;
    } else {
      if (email && email !== '') this.changeEmail(email, userId);

      if (newPassword1 && newPassword1 !=='') {
        if (newPassword1 === newPassword2) {
          this.changePassword(newPassword2, userId);
        } else {
          alert('Passwords did not match');
        }         
      }
    }  
  }

  render() {
    return(
      <div className="settings">
        <h4>User Settings</h4>

        <div className="updateEmail">
          <h3>Update your email address</h3>
          <input name="email" placeholder="E-mail" type="text" autoComplete="email" onChange={this.handleChange} />       
        </div>

        <div className="updatePassword">
          <h3>Change your password</h3>
          <input name="newPassword1" placeholder="New Password" type="password" onChange={this.handleChange} />   
          <input name="newPassword2" placeholder="New Password" type="password" onChange={this.handleChange} />         
        </div>

        <button onClick={this.handleSubmit}>Sumbit</button>
      </div>
    )
  }
}

export default Settings;