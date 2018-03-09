import React, { Component } from "react";
import ApiService from "../services/ApiService.js";

class Step extends Component {
  constructor(props){
    super(props);
    this.state = {
      complete: false
    }
  }

  toggleCheckbox = () => {
    const complete = !this.state.complete;
    this.setState({complete: complete }, ()=>{
      const stepId = this.props.stepId;
      ApiService.toggleCheckbox(stepId, complete)
    })
  }

  componentDidMount(){
    const courseId = this.props.courseId
    const stepId = this.props.stepId;
    ApiService.getUserSteps(courseId).then(res=>{
      for(var i = 0; i < res.length; i++){
        if(res[i].id === stepId){
          this.setState({complete: res[i].userStep.completed})
        }
      }
    })
  }

  render() {
    console.log(this.props.data)
    return (
      <a href={this.props.data.url} target="_blank">
      <div className="step">
        <div className="step-name">
          {
            this.props.enrolled
            ? (<input className="checkbox" type="checkbox" name="completion" checked={this.state.complete} onChange={this.toggleCheckbox}></input>)
            : <div></div>
          }
          <h4>Step {this.props.data.ordinalNumber + 1}: {this.props.data.name}</h4>
        </div>
        <div className="step-description">
        <p>{this.props.data.text}</p>
        </div>
        <div className="step-resource">
        <p className="click">CLICK TO BEGIN.</p>
        </div>
      </div>
      </a>
    );
  }
}

export default Step;