import React from "react";

class CourseHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }



  render(){

  const courseId = this.props.match.params.id;

  const course = sampleData[courseId];

  const steps = course.steps;

  const lessonPlan = steps.map((step) => {
      return (
        <Step
          key={step.id}
          data={step}/>
      )
    });
    return (
      <div className="course-view">
          <h3>{course.name}</h3>
          <h4>Rating: {course.rating}</h4>
          <p>{course.description}</p>
          {lessonPlan}
      </div>
    );
  }
}

export default Course;