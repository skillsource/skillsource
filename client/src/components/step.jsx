import React, { Component } from "react";

class Step extends Component {
  render() {
    return (
      <div className="step">
        <div className="step-name">
          <h4>{this.props.data.name}</h4>
        </div>
        <div className="step-description">
        <p>{this.props.data.description}</p>
        </div>
        <div className="step-resource">
        <p>Click here to begin: {this.props.data.resource}</p>
        </div>
      </div>
    );
  }
}

export default Step;