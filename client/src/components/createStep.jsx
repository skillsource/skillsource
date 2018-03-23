import React, { Component } from "react";
import CloudService from "../services/cloud";
import Attachment from "./attachment.jsx";

class CreateStep extends Component {
  constructor(props) {
    super(props);
    this.uploadInput = null;
    this.state = {};
    this.state.loading = false;
  }

  handleUrlInput(e) {
    if (e.key === 'Enter') {
      this.setState({ loading: true });

      CloudService.getScreenshot(e.target.value).then((res) => {
        this.setState({ loading: false });
        return res.json();
      }).then((results) => {
        const { public_id, secure_url, url } = results;
        let e = {
          target: {
            name: 'urlImgRef',
            value: public_id
          }
        };
        this.props.stepChange(e, this.props.data.ordinalNumber);
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  handleFileUpload(e) {
    let file = this.uploadInputRef.files[0];
    CloudService.upload(file).then((results) => {
      const { public_id, secure_url, url } = results;;

      let e = {
        target: {
          name: 'imgRef',
          value: public_id
        }
      };
      this.props.stepChange(e, this.props.data.ordinalNumber)
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <div className="create-step">
        <div className="stepOrder">
          <h4>Step # {this.props.data.ordinalNumber + 1}</h4>
          <button id="delete" onClick={() => { this.props.deleteStep(this.props.data.ordinalNumber) }}>Delete</button>
        </div>
        <div className="input">
          <input name="name" className="stepName" type="text" placeholder="Step name..." onChange={(e) => { this.props.stepChange(e, this.props.data.ordinalNumber) }} />
        </div>

        <h4>Attachments/Resources:</h4>
        {this.props.data.urlImgRef ? <Attachment url={this.props.data.url} imgRef={this.props.data.urlImgRef} />
          :
          <div className="form-element">
            <div className="input">
              <label>
                <strong>Link to online resource (optional)</strong><br />
                <small>Please type a full url and <strong>hit enter</strong>. When you provide a URL, we automatically visit that URL and create a screenshot to help users engage with your course. Don't worry if you see a <strong>loading</strong> icon-- just keep filling out the rest of the step information!</small>
                <input name="url" className="stepUrl" type="text" placeholder="Full URL (e.g., http://www.cnn.com)" onChange={(e) => { this.props.stepChange(e, this.props.data.ordinalNumber) }} onKeyPress={(e) => { this.handleUrlInput(e) }} />
                {this.state.loading ? <div><div className="loading-spinner">&nbsp;</div>Loading...</div> : ''}
              </label>
            </div>
          </div>
        }


        {this.props.data.imgRef ? <Attachment imgRef={this.props.data.imgRef} />
          :
          <div className="form-element">
            <div className="input">
              <label>
                <strong>Attach an image (optional)</strong><br />
                <input name="" ref={(ref) => { this.uploadInputRef = ref; }} className="" type="file" placeholder="..." onChange={this.handleFileUpload.bind(this)} />
              </label><br />
              <small>Please only upload images you have rights to. And SFW only please. Thanks!</small>
            </div>
          </div>
        }

        <h4>Other information:</h4>
        <div className="input">
          <textarea name="text" className="stepText" type="text" placeholder="Description..." onChange={(e) => { this.props.stepChange(e, this.props.data.ordinalNumber) }} />
        </div>

        <div className="input">
          <input name="duration" className="stepDuration" type="text" placeholder="Duration..." onChange={(e) => { this.props.stepChange(e, this.props.data.ordinalNumber) }} />
          <select name="units" onChange={(e) => { this.props.stepChange(e, this.props.data.ordinalNumber) }}>
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
            <option value="days">Days</option>
            <option value="weeks">Weeks</option>
          </select>
        </div>

      </div>
    );
  }
}

export default CreateStep;

