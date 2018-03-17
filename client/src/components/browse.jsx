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
      return title.includes(query) || description.includes(query)
    });
    this.setState({ filteredCourses });
  }

  componentDidMount() {
    ApiService.browse().then(courses => this.setState({ courses, filteredCourses: courses }), () => console.log(this.state.courses));
    ApiService.getTags().then(tags => this.setState({ tags }));
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

  render() {
    const snippets = this.state.filteredCourses.map(course => <Snippet key={course.id} data={course}/>);
    console.log(this.state.courses);
    const tags = this.state.tags.map(tag => {
      return (
        <div
          className="tag"
          key={tag.id}
          onClick={this.onTagClick}
        >
          {tag.name}
        </div>
      )
    });

    return (
      <div className="browse">
        <h3>Browse courses:</h3>
        <div
          className="tag"
          key="All"
          onClick={this.tagReset}
        >
          all courses
        </div>
        {tags}
        <input value={this.state.query} onChange={this.updateInputValue} className="search" type="search" placeholder="Search for courses..."></input>
        {snippets}
      </div>
    );
  }
}

export default Browse;
