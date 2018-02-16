import React, { Component } from "react";

class Step extends Component {
  render() {
    const url = this.props.data.resource;
    return (
      <a href={url}>
      <div className="step">
        <div className="step-name">
          <h4>Step {this.props.data.id}: {this.props.data.name}</h4>
        </div>
        <div className="step-description">
        <p>{this.props.data.description}</p>
        </div>
        <div className="step-resource">
        <p>Click to begin.</p>
        </div>
      </div>
      </a>
    );
  }
}

export default Step;