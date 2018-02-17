import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

class Nav extends Component {
  render() {
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
        <div className="navRight">
          <NavLink to="/signup">Signup</NavLink>
        </div>
        <div className="navRight">
          <NavLink to="/login">Login</NavLink>
        </div>
      </div>
    );
  }
}

export default Nav;