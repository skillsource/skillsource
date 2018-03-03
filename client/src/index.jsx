import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  NavLink,
  HashRouter,
  Redirect
} from "react-router-dom";
import styles from './styles.css';
import Nav from './components/nav.jsx';
import About from './components/about.jsx';
import Browse from './components/browse.jsx';
import Login from './components/login.jsx';
import Signup from './components/signup.jsx';
import Dashboard from './components/dashboard.jsx';
import Course from './components/course.jsx';
import Create from './components/create.jsx';
import AuthService from './components/AuthService.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.auth = AuthService;

  }

  render () {
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={props =>
        this.auth.loggedIn()
          ? <Component {...props} />
          : <Redirect to={{ pathname: "/login", state: { from: props.location } }}/>
      }/>
    );

    return (
      <HashRouter>
        <div className="viewport">

          <h1>Skillsource</h1>
          <Nav />
          <div className="content">
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <PrivateRoute path="/create" component={Create}/>
            <PrivateRoute path="/dashboard" component={Dashboard}/>
            <Route exact path="/courses" component={Browse} />
            <Route path="/courses/:id" render={(props) => <Course {...this.props} {...props} />}/>
          </div>
        </div>
      </HashRouter>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
