import React from 'react';
import Enroll from './enroll.jsx'
import StarRatingComponent from 'react-star-rating-component';
import ApiService from '../services/ApiService.js'

class CourseHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: null,
    };
  }

  onStarClick = (rating) => {
    ApiService.rate(this.props.course.id, rating)
      .then(({ rating }) => this.setState({ rating }))
      .then(() => {this.props.updateRatings()});
  }

  render(){
    const { course, enrolled, handleEnrollment, loggedIn } = this.props;
    const rating = this.state.rating || course.rating;
    const ratingsCountView = course.ratingsCount === 1 ? <p id="count">( {course.ratingsCount} review )</p> : (<p id="count">( {course.ratingsCount} reviews )</p>)

    return (
      <div className="course-header">
        <div id="course-name">
          <h3>{course.name}</h3>
        </div>
        <div id="course-rating">
          <StarRatingComponent id="stars"
            name="rating"
            starCount={5}
            value={rating}
            onStarClick={this.onStarClick}
            editing={enrolled}
          />
          {ratingsCountView}

        </div>
        <div id="course-enroll">
          <Enroll
            handleEnrollment={handleEnrollment}
            enrolled={enrolled}
            loggedIn={loggedIn} />
        </div>
      </div>
    );
  }
}

export default CourseHeader;
