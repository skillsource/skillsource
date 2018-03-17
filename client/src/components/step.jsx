import React, { Component } from "react";
import ApiService from "../services/ApiService.js";
import urlmodule from 'url';
import moment from 'moment';

class Step extends Component {
  constructor(props){
    super(props);
    this.state = {
      complete: false
    }
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

  toggleCheckbox = () => {
    const complete = !this.state.complete;
    this.setState({complete: complete }, ()=>{
      const stepId = this.props.stepId;
      ApiService.toggleCheckbox(stepId, complete)
    })
  }

  getYoutubeId = (ytUrl) => {
    let id = '';
    ytUrl = ytUrl.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (ytUrl[2] !== undefined) {
      id = ytUrl[2].split(/[^0-9a-z_\-]/i);
      id = id[0];
    } else {
      id = ytUrl;
    }
    return id;
  }

  render() {
    const {url, ordinalNumber, name, text} = this.props.data;
    let host = urlmodule.parse(url).hostname;

    if (host === 'youtube.com' || host === 'youtu.be' || host === 'www.youtube.com') {

      let embedId = this.getYoutubeId(url);
      let youtubeUrl = `https://www.youtube.com/embed/${embedId}`;

      return (
        <div className="step">
          <div className="step-name">
            {
              this.props.enrolled
              ? (<input className="checkbox" type="checkbox" name="completion" checked={this.state.complete} onChange={this.toggleCheckbox}></input>)
              : <div></div>
            }
            <h4>Step {ordinalNumber + 1}: {name}</h4>
          </div>
          <div className="step-video">
            <iframe className="ytplayer" type="text/html" width="640" height="360"
            src={youtubeUrl}></iframe>
          </div>
          <div className="step-description">
          <p>{text}</p>
          </div>
        </div>


        )

    } else {
      const screenshot = `/screenshots/${this.props.stepId}.jpg`
      host = host.toUpperCase();

      return (
        <a href={url} target="_blank">
        <div className="step">
          <div className="step-name">
            {
              this.props.enrolled
              ? (<input className="checkbox" type="checkbox" name="completion" checked={this.state.complete} onChange={this.toggleCheckbox}></input>)
              : <div></div>
            }

            <div class="step-headers">
            <strong>Step {ordinalNumber + 1}: {name}</strong>
            <br/>
            <div className="icon">
              <i className="material-icons">watch_later</i> { moment.duration(this.props.data.minutes || 0, "minutes").humanize() }
            </div>
            </div>

          </div>
          <div>
          <img className="step-screenshot" src={screenshot}></img>
          <p className="screenshot-desc">{host}</p>
          </div>
          <div className="step-description">
          <p>{text}</p>
          </div>
          <div className="click">
          <p>CLICK TO BEGIN.</p>
          </div>
        </div>
        </a>
      );
    }
  }
}

export default Step;