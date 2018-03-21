import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import moment from 'moment';


class Snippet extends Component {
  constructor(props) {
    super(props);
  }

  onMouseEnter = () => {
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(this.props.data.steps);
    }
  }

  onMouseLeave = () => {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave();
    }
  }

  render() {
    const { id, name, rating, description, steps } = this.props.data;
    const url = "#/courses/" + id;
    
    let totalMinutes = 0;

    steps.forEach(step => totalMinutes += step.minutes);

    const time = moment.duration(totalMinutes, 'minutes').humanize();

    return (
      <a href={url} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        <div className="snippet">
          <div className="snippet-name">
            <h4>{name}</h4>
          </div>
          {
            (this.props.numOfEnroll >= 0)
            ? <p className="enrollment-counts">{this.props.numOfEnroll} users enrolled </p>
            : <p></p>
          }
          <div className="snippet-time">
            <h4>Estimated Time: {time}</h4>
          </div>
          <div className="snippet-rating">
            <StarRatingComponent
              name="rating"
              starCount={5}
              value={rating}
              editing={false}
            />
          </div>
          {
              Number.isInteger(this.props.progress)
              ? ((this.props.progress === 100)
                ? <p className='progress'>Completed!</p>
                : <div className='progress'><p>In progress: </p>
                <p>{this.props.progress}% complete. </p>
                </div>) 
              : this.props.progress === "not enrolled"
                ? <p className='progress'>You're not enrolled</p>
              :<p></p>
          }
          <div className="snippet-description">
          <p>{description}</p>
          </div>
        </div>
      </a>
    );
  }
}

export default Snippet;
