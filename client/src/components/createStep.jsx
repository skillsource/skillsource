import React, { Component } from "react";
import CloudService from "../services/cloud";

class CreateStep extends Component {
  constructor(props) {
    super(props);
    this.uploadInput = null;
  }

  handleFileUpload(e) {

    let file = this.uploadInputRef.files[0];
    CloudService.upload(file).then((results) => {
      const {public_id, secure_url, url} = results;;

      let e = {
        target: {
          name: 'imgRef',
          value: public_id
        }
      };
      this.props.stepChange(e, this.props.data.ordinalNumber)
    }).catch((err) => {
      console.log(err);
    })

  }

  render() {
    return (
      <div className="create-step">
        <div className="stepOrder">
        <h4>Step # {this.props.data.ordinalNumber + 1}</h4>
        <button id="delete" onClick={() => {this.props.deleteStep(this.props.data.ordinalNumber)}}>Delete</button>
        </div>
        <div className="input">
          <input name="name" className="stepName" type="text" placeholder="Step name..." onChange={(e) => {this.props.stepChange(e, this.props.data.ordinalNumber)}}/>
        </div>

        <div className="input">
          <textarea name="text" className="stepText" type="text" placeholder="Description..."onChange={(e) => {this.props.stepChange(e, this.props.data.ordinalNumber)}}/>
        </div>
        <div className="input">
          <input name="duration" className="stepDuration" type="text" placeholder="Duration..." onChange={(e) => {this.props.stepChange(e, this.props.data.ordinalNumber)}}/>
          <select name="units" onChange={(e) => {this.props.stepChange(e, this.props.data.ordinalNumber)}}>
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
            <option value="days">Days</option>
            <option value="weeks">Weeks</option>
          </select>
        </div>
        <h4>Attachments/Resources:</h4>
        <div className="form-element">
          <div className="input">
            <label>
              Link to online resource<br/>
              <input name="url" className="stepUrl" type="text" placeholder="Full URL (e.g., http://www.cnn.com)..." onChange={(e) => {this.props.stepChange(e, this.props.data.ordinalNumber)}}/>
            </label>
          </div>
        </div>
        <div className="form-element">
          <div className="input">
            <label>
              Attach an image<br/>
              <input name="" ref={(ref) => { this.uploadInputRef = ref; }} className="" type="file" placeholder="..." onChange={this.handleFileUpload.bind(this)}/>
            </label><br/>
            <small>Please only upload images you have rights to. And SFW only please. Thanks!</small>
          </div>
        </div>

        { this.props.data.imgRef ? 
          CloudService.getFromCloudinary(this.props.data.imgRef)
          : 
          ''
        }

      </div>
    );
  }
}

export default CreateStep;

