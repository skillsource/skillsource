import React from "react";
import Snippet from './snippet.jsx';
import ApiService from '../services/ApiService.jsx';

class Dashboard extends React.Component {

  constructor(props){
    super(props);
    this.state={
      courses: []
    }
  }

  componentDidMount(){
    ApiService.getEnrollments().then(res => {
      this.setState({courses: res});
    })
  }

  render(){
    const snippets = this.state.courses.map((course) => {
      return (
        <Snippet
          key={course.id}
          data={course}/>
      )
    });
    return (
      <div className="dashboard">
          <h3>You are enrolled in:</h3>
          {snippets}
      </div>

    );
  }
}

export default Dashboard;