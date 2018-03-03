import React, { Component } from 'react';
import ReactStars from 'react-stars';

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
          <ReactStars value={rating} size={20} edit={false}/>
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
