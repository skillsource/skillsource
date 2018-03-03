import React, { Component } from "react";

class Step extends Component {
  render() {
    return (
      <a href={this.props.data.url} target="_blank">
      <div className="step">
        <div className="step-name">
          <h4>Step {this.props.data.ordinalNumber + 1}: {this.props.data.name}</h4>
        </div>
        <div className="step-description">
        <p>{this.props.data.text}</p>
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