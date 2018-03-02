import React, { Component } from "react";
import ApiService from '../services/ApiService.jsx';
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
            <input name="name" id="createName" type="text" onChange={this.handleChange}/>
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
    ApiService.createCourse(this.state.name, this.state.description, this.state.url, this.state.steps)
      .then(res => {
        console.log("CourseId:", res.id)
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
        id: this.step.idCounter
      }
    )
    this.setState({
      steps: stepsArray,
      idCounter: idCounter++
    });
  }

  deleteStep = (index) => {
    console.log('delete index', index);

    let stepsArray = this.state.steps.slice();
    stepsArray.splice(index, 1);
    let counter = 0;
    stepsArray.forEach((step) => {
      step.ordinalNumber = counter;
      counter++;
    })
    this.setState({
      steps: stepsArray
    }, () => {
      console.log('state post delete', this.state.steps);
    })


  }

  handleStepsChange = (e, index) => {
    let stepsArray = this.state.steps.slice();

    stepsArray[index][e.target.name] = e.target.value;

    this.setState({
      steps: stepsArray
    });
    console.log('State post step change', this.state.steps)
  }

}

export default Create;