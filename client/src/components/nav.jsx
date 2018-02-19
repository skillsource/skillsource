import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import AuthService from './AuthService.jsx';

class Nav extends Component {
  constructor() {
    super();
    this.auth = new AuthService();
  }

  handleClick = () => {
    this.auth.logout();
  }

  render() {
    const loggedOut = (
      <div className="navRight">
        <div className="childRight">
          <NavLink to="/signup">Signup</NavLink>
        </div>
        <div className="childRight">
          <NavLink to="/login">Login</NavLink>
        </div>
      </div>
    );

    const loggedIn = (
      <div className="navRight">
        <div className="childRight">
          <NavLink to="/login" onClick={this.handleClick}>Logout</NavLink>
        </div>
      </div>
    );

    const NavRight = this.auth.loggedIn() ? loggedIn : loggedOut;

    return (
      <div className="nav">
        <div className="navLeft">
          <NavLink to="/about">About</NavLink>
        </div>
        <div className="navLeft">
          <NavLink to="/courses">Browse</NavLink>
        </div>
        <div className="navLeft">
          <NavLink to="/dashboard">Dashboard</NavLink>
        </div>
        <div className="navLeft">
          <NavLink to="/create">Create Course</NavLink>
        </div>
        { NavRight }
      </div>
    );
  }
}

export default Nav;