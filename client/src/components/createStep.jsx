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
          <input name="name" className="stepName" type="text" placeholder="Step name..." onChange={(e) => {this.props.stepChange(e, this.props.data.ordinalNumber)}}/>
        </div>
        <div className="input">
          <input name="url" className="stepUrl" type="text" placeholder="URL..." onChange={(e) => {this.props.stepChange(e, this.props.data.ordinalNumber)}}/>
        </div>
        <div className="input">
          <textarea name="text" className="stepText" type="text" placeholder="Description..."onChange={(e) => {this.props.stepChange(e, this.props.data.ordinalNumber)}}/>
        </div>
        <div className="input">
          <input name="duration" className="stepDuration" type="text" placeholder="Duration..." onChange={(e) => {this.props.stepChange(e, this.props.data.ordinalNumber)}}/>
          <select name="units" onChange={(e) => {this.props.stepChange(e, this.props.data.ordinalNumber)}}>
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
            <option value="days">Days</option>
            <option value="weeks">Weeks</option>
          </select>
        </div>
      </div>
    );
  }
}

export default CreateStep;

