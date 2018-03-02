import React from "react";
import Snippet from './snippet.jsx';
import ApiService from '../services/ApiService.jsx';

const Dashboard = (props) => {
  let courses = [];
  ApiService.getEnrollments()
    .then((res) => {
      courses = res;
    })
    .catch((error) => {
      console.log("error calling getEnrollments in ApiService:", error)
    })

  const snippets = courses.map((course) => {
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

export default Dashboard;