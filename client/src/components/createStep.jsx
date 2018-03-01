import React, { Component } from "react";

class CreateStep extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="create-step">
        <div className="stepOrder">
        <h4>Step # {this.props.data.ordinalNumber + 1}</h4>
        <button id="delete" onClick={() => {this.props.deleteStep(this.props.data.ordinalNumber)}}>Delete</button>
        </div>
        <div className="input">
          <label>Step Name: </label>
          <input name="stepname" id="stepname" type="text" onChange={(e) => {this.props.stepChange(e, this.props.data.ordinalNumber)}}/>
        </div>
        {/*<div className="input">
          <label>Resource URL: </label>
          <input name="url" id="url" type="text"/>
        </div>*/}
        <div className="input">
          <label>Text: </label>
          <input name="text" className="stepText" type="text" onChange={(e) => {this.props.stepChange(e, this.props.data.ordinalNumber)}}/>
        </div>
      </div>
    );
  }
}

export default CreateStep;

