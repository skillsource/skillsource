import React, { Component } from "react";
import axios from 'axios';
import CourseSnippet from './courseSnippet.jsx';
import $ from 'jquery';

class Browse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [{id: 12,
              name: 'How to make Cup Noodle', 
              description: 'blah blah blah blah blah blah blah blah blah blah blah blah', 
              user_id: 3, 
              rating: 9},
              {id: 13,
              name: 'Become a Pokemon Master', 
              description: 'blah blah blah sfda sadf wef asd. sad fas saf2fwad', 
              user_id: 5, 
              rating: 0},
              {id: 14,
              name: 'Learn to ride a bike', 
              description: 'sdfasd wfwq a aw fcawcwacawcawcaw cawcawecawaewf w waef wagfwawasdfwds rfafaewaweawea sdfas das df asdf a dfd', 
              user_id: 8, 
              rating: 1}
      ],
      query: '',
      toDisplay: [{id: 12,
              name: 'How to make Cup Noodle', 
              description: 'blah blah blah blah blah blah blah blah blah blah blah blah', 
              user_id: 3, 
              rating: 9},
              {id: 13,
              name: 'Become a Pokemon Master', 
              description: 'blah blah blah sfda sadf wef asd. sad fas saf2fwad', 
              user_id: 5, 
              rating: 0},
              {id: 14,
              name: 'Learn to ride a bike', 
              description: 'sdfasd wfwq a aw fcawcwacawcawcaw cawcawecawaewf w waef wagfwawasdfwds rfafaewaweawea sdfas das df asdf a dfd', 
              user_id: 8, 
              rating: 1}
      ]
    };
  }

  getCourses(){
    fetch('http://localhost:3000/courses',
     {
      method: 'GET'
    }).then((res)=>{
      //response comes back as array?
      return res.json();
    }).then((courses)=>{
      this.setState({data: courses})
    })
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
    //this.getCourses()
  }

  render() {
    //not logged in
    return (
      <div className="browse">
        <h3>Browse courses:</h3>
        <input className="search" type="search" placeholder="Search"></input>
        <button onClick={this.search.bind(this)}className="searchButton" type="submit">Search</button>
        {this.state.toDisplay.map((course)=>{
          return <CourseSnippet course={course}/>
        })}
      </div>
    );
  }
}

export default Browse;