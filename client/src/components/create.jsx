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
      idCounter: 3,
      tags: [],
      tagName: '',
    };
  }

  componentDidMount() {
    ApiService.getTags()
      .then(tags => this.setState({ tags, tagName: tags[0].name }));
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { tags, tagName, name, description } = this.state;
    const steps = this.state.steps.map(({ id, ...step }) => step);
    const courseTags = tags.filter(tag => tag.name === tagName);
    ApiService.createCourse(this.state.name, this.state.description, steps, courseTags)
      .then(course => this.props.history.replace("/courses/" + course.id))
      .catch(err => console.error('err in handleSubmit', err));
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

  onTagChange = (e) => {
    const tagName = e.target.value;
    this.setState({ tagName });
  }

  render() {
    const Steps = this.state.steps.map((step) => {
      return (
        <CreateStep key={step.id} data={step} deleteStep={this.deleteStep} stepChange={this.handleStepsChange}/>
    )});

    const tags = this.state.tags.map(tag => <option key={tag.id} value={tag.name}>{tag.name}</option>)

    return (
      <div className="create-page">
        <h3>Create a new course:</h3>
        <div className="create">
          <div className="input">
            <label>Course Name: </label>
            <input name="name" id="createName" type="text" onChange={this.handleChange} />
          </div>
          <div className="input">
             <label>Course Tag:</label>
            <select className="tagSelect" value={this.state.tagName} onChange={this.onTagChange}>
              {tags}
            </select>
          </div>
          <div className="input">
            <label>Description: </label>
            <textarea name="description" id="createDescription" type="text" onChange={this.handleChange}/>
          </div>
          {Steps}
          <button onClick={this.addStep}>Add a step</button>
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}

export default Create;
