import React, { Component } from "react";
import ApiService from '../services/ApiService.js';
import CreateStep from './createStep.jsx';

class Create extends Component {
  constructor() {
    super();
    // this.steps = props.stepDetails;
    this.state = {
      steps: [
          {
            name: '',
            ordinalNumber: 0,
            text: '',
            url: '',
            id: 0
          },
          {
            name: '',
            ordinalNumber: 1,
            text: '',
            url: '',
            id: 1
          },
          {
            name: '',
            ordinalNumber: 2,
            text: '',
            url: '',
            id: 2
          }
        ],
      idCounter: 3
    };
  }

  render() {

    const Steps = this.state.steps.map((step) => {
      return (
        <CreateStep key={step.id} data={step} deleteStep={this.deleteStep} stepChange={this.handleStepsChange}/>
    )});

    return (
      <div className="create">
        <h3>Create a course:</h3>
          <div className="input">
            <label>Course Name: </label>
            <input name="name" id="createName" type="text" onChange={this.handleChange} />
          </div>
          <div className="input">
            <label>Description: </label>
            <input name="description" id="createDescription" type="text" onChange={this.handleChange}/>
          </div>
          {Steps}
          <button onClick={this.addStep} className="addStep">Add a step</button>
          <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }



  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const steps = this.state.steps.map(({ id, ...step }) => step)
    ApiService.createCourse(this.state.name, this.state.description, steps)
      .then(res => {
        let courseId = res.id;
        this.props.history.replace("/courses/" + courseId);
      })
      .catch(err =>
        console.error('err in handleSubmit', err)
      );
  }

  addStep = () => {
    let stepsArray = this.state.steps.slice();
    let nextOrdinal = stepsArray.length;
    stepsArray.push(
      {
        name: '',
        ordinalNumber: nextOrdinal,
        text: '',
        url: '',
        id: this.state.idCounter
      }
    )

    this.setState({
      steps: stepsArray,
      idCounter: this.state.idCounter + 1
    });
  }

  deleteStep = (index) => {
    let stepsArray = this.state.steps.slice();
    stepsArray.splice(index, 1);
    let counter = 0;
    stepsArray.forEach((step) => {
      step.ordinalNumber = counter;
      counter++;
    })
    this.setState({
      steps: stepsArray
    })
  }

  handleStepsChange = (e, index) => {
    let stepsArray = this.state.steps.slice();

    stepsArray[index][e.target.name] = e.target.value;

    this.setState({
      steps: stepsArray
    });
  }

}

export default Create;