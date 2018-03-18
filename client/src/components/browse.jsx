import React, { Component } from 'react';
import axios from 'axios';
import Snippet from './snippet.jsx';
import ApiService from '../services/ApiService.js'

class Browse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      filteredCourses: [],
      query: '',
      tags: [],
      steps: [], 
    };
  }

  updateInputValue = (e) => {
    this.setState({
      query: e.target.value
    }, () => {
      this.search();
    });
  }

  search = () => {
    const query = this.state.query.toLowerCase();
    const filteredCourses = this.state.courses.filter(course => {
      const title = course.name.toLowerCase();
      const description = course.description ? course.description.toLowerCase() : '';
      return title.includes(query) || description.includes(query);
    });
    this.setState({ filteredCourses });
  }

  componentDidMount() {
    ApiService.browse()
      .then(courses => this.setState({ courses, filteredCourses: courses }));
    ApiService.getTags()
      .then(tags => this.setState({ tags }));
  }

  onTagClick = (e) => {
    const filteredCourses = this.state.courses.filter(course => {
      return course.tags.map(tag => tag.name).includes(e.target.innerHTML);
    });
    this.setState({ filteredCourses });
  }

  tagReset = () => {
    this.setState({
      filteredCourses: this.state.courses
    });
  }

  onMouseEnter = (steps) => {
    this.setState({ steps });
  }

  onMouseLeave = () => {
    this.setState({ steps: [] });
  }

  render() {
    const snippets = this.state.filteredCourses.map(course => {
      return (
        <Snippet
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          key={course.id} data={course}
        />
      )
    });
    const tags = this.state.tags.map(tag => {
      return (
        <div className="tag" key={tag.id} onClick={this.onTagClick}>
          {tag.name}
        </div>
      )
    });
    const steps = this.state.steps.map(step => <p key={step.id}>{step.ordinalNumber + 1}: {step.text}</p>)
    return (
      <div className="browse">
        <div className="browse-filters">
          <div className="tag" key="All" onClick={this.tagReset}>
            all courses
          </div>
          {tags}
          <input value={this.state.query} onChange={this.updateInputValue} className="search" type="search" placeholder="Search for courses..."></input>
        </div>
        <div className="browse-courses">
          <div className="browse-snippets">
            {snippets}
          </div>
          <div className="browse-preview">
            {steps}
          </div>
        </div>
      </div>
    );
  }
}

export default Browse;
