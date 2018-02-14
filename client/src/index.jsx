import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import styles from './styles.css';
import Nav from './components/nav.jsx';
import About from './components/about.jsx';
import Browse from './components/browse.jsx';
import Login from './components/login.jsx';
import Signup from './components/signup.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render () {
    return (
      <HashRouter>
        <div className="viewport">

          <h1>Skillsource</h1>
          <Nav />
          <div className="content">
            <Route path="/about" component={About}/>
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={Signup}/>
            <Route exact path="/courses" component={Browse}/>
          </div>
        </div>
      </HashRouter>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
