import React from "react";
import Enroll from "./enroll.jsx"
import ReactStars from 'react-stars';

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
          <h3>{this.props.course.name}</h3>
        </div>
        <div id="course-rating">
          <ReactStars value={this.props.course.rating} size={20} edit={false}/>
        </div>
        <div id="course-enroll">
          <Enroll handleEnrollment={this.props.handleEnrollment} enrolled={this.props.enrolled} loggedIn={this.props.loggedIn} />
        </div>
      </div>
    );
  }
}

export default CourseHeader;