import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import AuthService from '../services/AuthService.js';

class Nav extends Component {
  constructor() {
    super();
    this.auth = AuthService;
  }

  handleClick = () => {
    this.auth.logout();
  }

  render() {
    const loggedOut = (
      <div className="navRight">
        <NavLink to="/signup">Signup</NavLink>
        <NavLink to="/login">Login</NavLink>
      </div>
    );

    const loggedIn = (
      <div className="navRight">
        <NavLink to="/settings">Settings</NavLink>
        <NavLink to="/login" onClick={this.handleClick}>Logout</NavLink>
      </div>
    );

    const NavRight = this.auth.loggedIn() ? loggedIn : loggedOut;

    return (
      <div className="nav">
        <div className="navLeft">
          <NavLink to="/" id="title">Skillsource</NavLink>
          <NavLink to="/courses">Browse</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/create">Create Course</NavLink>
        </div>
        { NavRight }
      </div>
    );
  }
}

export default Nav;
