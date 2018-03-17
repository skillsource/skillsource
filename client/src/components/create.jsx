import React, { Component } from "react";
import ApiService from '../services/ApiService.js';
import CreateStep from './createStep.jsx';
import ReactTags from 'react-tag-autocomplete';
import moment from 'moment';

class Create extends Component {
  constructor() {
    super();
    this.state = {
      steps: [
        {
          name: '',
          ordinalNumber: 0,
          text: '',
          url: '',
          id: 0,
          duration: 0,
          minutes: 0,
          units: 'minutes'
        },
      ],
      idCounter: 1,
      tags: [],
      suggestions: [],
    };
  }

  componentDidMount() {
    ApiService.getTags()
      .then(tags => this.setState({ suggestions: tags }));
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { tags, suggestions, name, description } = this.state;
    const steps = this.state.steps.map(({ id, ...step }) => step);
    ApiService.createCourse(this.state.name, this.state.description, steps, tags)
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
    var units = stepsArray[index]['units']
    var duration = Number(stepsArray[index]['duration'])
    var obj = {}; 
    obj[`${units}`] = duration
    var minutes = moment.duration(obj).asMinutes()
    
    stepsArray[index]['minutes'] = minutes;

    this.setState({
      steps: stepsArray
    });
  }

  handleDelete = (i) => {
    const tags = this.state.tags.slice(0);
    tags.splice(i, 1);
    this.setState({ tags });
  }

  handleAddition = (tag) => {
    const tags = [].concat(this.state.tags, tag);
    this.setState({ tags });
  }

  render() {
    const Steps = this.state.steps.map((step) => {
      return (
        <CreateStep key={step.id} data={step} deleteStep={this.deleteStep} stepChange={this.handleStepsChange}/>
    )});

    return (
      <div className="create-page">
        <h3>Create a new course:</h3>
        <div className="create">
          <div className="input">
            <label>Course Name: </label>
            <input name="name" id="createName" type="text" onChange={this.handleChange} />
          </div>
          <ReactTags
            tags={this.state.tags}
            suggestions={this.state.suggestions}
            handleDelete={this.handleDelete}
            handleAddition={this.handleAddition}
            allowNew={true}
          />
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
