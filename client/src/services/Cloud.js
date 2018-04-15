import React from "react";
import cloudinary from 'cloudinary';
import settings from '../../../config/cloudinary.js';

cloudinary.config(settings);

const CloudService = {

  getFromCloudinary(publicId) {
    let imgSrc = cloudinary.url(`${publicId}`, { height: 200 });

    return (
      <img className="step-screenshot" src={imgSrc} />
    );
  },

  upload(file) {

    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.onload = function (e) {
        cloudinary.uploader.upload(reader.result, (results) => {
          if (results === null) {
            reject();
          }
          resolve(results);
        });
      };
      reader.readAsDataURL(file);
    });
  },

  getScreenshot(url) {
    // Returns data from microservice as a promise
    return fetch(`https://pure-fortress-98081.herokuapp.com/api/screenshot/${url}`);
  }

};

export default CloudService;
