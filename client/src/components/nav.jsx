import React, { Component } from "react";
import {
  Route,
  NavLink,
  BrowserRouter
} from "react-router-dom";

class Nav extends Component {
  render() {
    return (
      <div className="nav">
        <div className="navButton">
          <NavLink to="/about">About</NavLink>
        </div>
        <div className="navButton">
          <NavLink to="/courses">Browse</NavLink>
        </div>
      </div>
    );
  }
}

export default Nav;