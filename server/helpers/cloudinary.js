const cloudinary = require('cloudinary');
const settings = require('../../config/cloudinary');

// Configure cloudinary

cloudinary.config(settings);

module.exports = cloudinary;
