import React from "react";
import Enroll from "./enroll.jsx"

class CourseHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render(){
    return (
      <div className="course-header">
        <div id="course-name">
          <h3>{course.name}</h3>
        </div>
        <div id="course-rating">
          <h4>Rating: {course.rating}</h4>
        </div>
        <div id="course-enroll">
          <Enroll />
        </div>
      </div>
    );
  }
}

export default CourseHeader;