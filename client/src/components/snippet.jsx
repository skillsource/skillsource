import React, { Component } from "react";

class Snippet extends Component {
  render() {
    const url = "#/courses/" + this.props.data.id
    return (
      <a href={url}>
      <div className="snippet">
        <div className="snippet-name">
          <h4>{this.props.data.name}</h4>
        </div>
        <div className="snippet-rating">
          <p>Reviews: {this.props.data.rating}</p>
        </div>
        <div className="snippet-description">
        <p>{this.props.data.description}</p>
        </div>
      </div>
      </a>
    );
  }
}

export default Snippet;