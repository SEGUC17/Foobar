// load the things we need
const mongoose = require('mongoose');
const path = require('path');
const filePluginLib = require('mongoose-file');

const filePlugin = filePluginLib.filePlugin;
const makeUploadToModel = filePluginLib.make_upload_to_model;

const uploadsBase = path.join(__dirname, 'uploads');
const uploads = path.join(uploadsBase, 'u');

// define the schema for our user model
const imageSchema = mongoose.Schema({
  user_id: String,
  title: String,
  caption: String,
});

imageSchema.plugin(filePlugin, {
  name: 'img',
  upload_to: makeUploadToModel(uploads, 'photos'),
  relative_to: uploadsBase,
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Image', imageSchema);
