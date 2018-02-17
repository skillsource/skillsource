import React from "react";
import Snippet from './snippet.jsx';

const Dashboard = (props) => {
  const courses = props.enrolled;

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