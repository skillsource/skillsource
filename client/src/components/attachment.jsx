import React, { Component } from "react";
import CloudService from "../services/cloud";

class Attachment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false
    }
  }
  
  render() {
    return (
      <div className="attachment">
        {CloudService.getFromCloudinary(this.props.imgRef)}
        <strong>{this.props.url}</strong>
      </div>
    );
  } 
}

export default Attachment;
