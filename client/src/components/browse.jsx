import React, { Component } from "react";
import axios from 'axios';
import Snippet from './snippet.jsx';
import ApiService from '../services/ApiService.jsx'



class Browse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };

  }

  search(){
    // axios.get(this.getCourses())
    // .then(()=>{

    // })
    var query = $("input").val().toLowerCase();
    var filteredData = this.state.data.filter((course)=>{
      var title = course.name.toLowerCase();
      var description = course.description.toLowerCase();
      return title.includes(query) || description.includes(query)
    })
    this.setState({toDisplay: filteredData})
  }

  componentWillMount(){
    ApiService.browse()
    .then((data) => {
      this.setState({
        data: data
      })
    })
  }

  render() {
    const snippets = this.state.data.map((course) => {
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
        <input className="search" type="search" placeholder="Search"></input>
        <button onClick={this.search.bind(this)}className="searchButton" type="submit">Search</button>
        {snippets}
      </div>
    );
  }
}

export default Browse;