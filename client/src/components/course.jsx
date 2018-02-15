import React from "react";
import Step from './step.jsx';

const Course = (props) => {
  const courseSteps = props.course.steps;

  const steps = courseSteps.map((step) => {
      return (
        <Step
          key={step.id}
          data={step}/>
      )
    });

  return (
    <div className="course-view">
        <h3>Course title goes here:</h3>
        {steps}
    </div>
  );
}

export default Dashboard;