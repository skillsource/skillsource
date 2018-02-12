import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render () {
    return (
      <div>
        <h1>SkillSource</h1>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
