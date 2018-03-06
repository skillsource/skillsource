import React, { Component } from 'react';
import axios from 'axios';
import Snippet from './snippet.jsx';
import ApiService from '../services/ApiService.js'

class Browse extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      query: '',
      toDisplay: []
    };
  }

  updateInputValue = (e) => {
    this.setState({
      query: e.target.value
    });
  }

  search = () => {
    var query = this.state.query.toLowerCase();
    var filteredData = this.state.data.filter((course)=>{
      var title = course.name.toLowerCase();
      var description;
      course.description === null ? description = '' : description = course.description.toLowerCase();
      return title.includes(query) || description.includes(query)
    })
    this.setState({toDisplay: filteredData})
  }

  componentWillMount() {
    ApiService.browse()
      .then((data) => {
        this.setState({
          data: data,
          toDisplay: data
        })
      })
  }

  render() {
    const snippets = this.state.toDisplay.map((course) => {
      return (
        <Snippet
          key={course.id}
          data={course}/>
      )
    });
    //not logged in
    return (
      <div className="browse">
        <h3>Browse courses:</h3>
        <input value={this.state.query} onChange={this.updateInputValue} className="search" type="search" placeholder="Search"></input>
        <button onClick={this.search} className="searchButton" type="submit">Search</button>
        {snippets}
      </div>
    );
  }
}

export default Browse;