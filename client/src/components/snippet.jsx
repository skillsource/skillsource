import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';

class Snippet extends Component {
  render() {
    const { id, name, rating, description } = this.props.data;
    const url = "#/courses/" + id
    return (
      <a href={url}>
      <div className="snippet">
        <div className="snippet-name">
          <h4>{name}</h4>
        </div>
        <div className="snippet-rating">
          <StarRatingComponent
            name="rating"
            starCount={5}
            value={rating}
            editing={false}
          />
        </div>
        <div className="snippet-description">
        <p>{description}</p>
        </div>
      </div>
      </a>
    );
  }
}

export default Snippet;
