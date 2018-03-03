import React from "react";
import Enroll from "./enroll.jsx"
import StarRatingComponent from 'react-star-rating-component';

class CourseHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  onStarClick = (rating) => {
    console.log(rating);
  }

  render(){
    return (
      <div className="course-header">
        <div id="course-name">
          <h3>{this.props.course.name}</h3>
        </div>
        <div id="course-rating">
          <StarRatingComponent
            name="rating"
            starCount={5}
            value={this.props.course.rating}
            onStarClick={this.onStarClick}
            editing={this.props.enrolled}
          />
        </div>
        <div id="course-enroll">
          <Enroll handleEnrollment={this.props.handleEnrollment} enrolled={this.props.enrolled} loggedIn={this.props.loggedIn} />
        </div>
      </div>
    );
  }
}

export default CourseHeader;
