import React, { Component } from 'react';
import axios from 'axios';
import AuthService from '../services/AuthService.js'

class Settings extends Component {
  constructor(props) {
    super(props);
    this.auth = AuthService;
    this.state = {
      reminders: 'yes',
      selectedOption: 'yes',
      emailOnEnroll: true,
      emailReminders: true
    }
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
        this.setState({
          email: '',
        }, () => alert('your email has been updated'));
      })
      .catch(err => {
        console.log(err);
        alert('your email has not been updated');
      });       
  }

  changeEnrollmentSettings = (desired, userId) => {
    this.auth.updateEnrollmentEmails(desired, userId)
      .then(res => {
        this.setState({
          emailOnEnroll: ''
        }, () => alert('your enrollment preferences have been updated'));
      })
      .catch(err => {
        console.log(err);
        alert('your enrollment preferences have not been updated');
      });
  }

  changeReminderSettings = (desired, userId) => {
    this.auth.updateReminderEmails(desired, userId)
      .then(res => {
        this.setState({
          emailReminders: ''
        }, ()=> alert('your email preferences have been updated'));
      })
      .catch(err => {
        console.log(err);
        alert('your email preferences have not been updated');
      });
  }

  handleOptionChange = (e) => {
    this.setState({
      selectedOption: e.target.value,
      emailOnEnroll: e.target.value === 'yes' ? true : false
    });
  }

  handleRemindersChange = (e) => {
    this.setState({
      reminders: e.target.value,
      emailReminders: e.target.value === 'yes' ? true: false
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, newPassword1, newPassword2, emailOnEnroll, selectedOption, emailReminders } = this.state;
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

      if (emailOnEnroll !== '') {
        this.changeEnrollmentSettings(this.state.emailOnEnroll, userId);
      }

      if (emailReminders !== '') {
        this.changeReminderSettings(this.state.emailReminders, userId);
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

        <div className="updateEnrollmentEmails">
          <h3>Would you like to receive email reminders to complete courses you have enrolled in?</h3>
          <form>
            <div className="radio">
              <label>
                <input type="radio" value="yes" 
                checked={this.state.reminders === 'yes'} 
                onChange={this.handleRemindersChange} 
              />YES</label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value="no" 
                checked={this.state.reminders === 'no'} 
                onChange={this.handleRemindersChange}/>
                NO </label>
            </div>
          </form>
        </div>

         <div className="updateEnrollmentEmails">
          <h3>Would you like to be emailed when new users enroll in the courses you create?</h3>
          <form>
            <div className="radio">
              <label>
                <input type="radio" value="yes" 
                checked={this.state.selectedOption === 'yes'} 
                onChange={this.handleOptionChange} 
              />YES</label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value="no" 
                checked={this.state.selectedOption === 'no'} 
                onChange={this.handleOptionChange}/>
                NO </label>
            </div>
          </form>
        </div>

        <button onClick={this.handleSubmit}>Sumbit</button>
      </div>
    )
  }
}

export default Settings;