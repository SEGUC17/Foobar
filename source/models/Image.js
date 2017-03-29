// load the things we need
var mongoose = require('mongoose');

var path = require('path');

var filePluginLib = require('mongoose-file');
var filePlugin = filePluginLib.filePlugin;
var make_upload_to_model = filePluginLib.make_upload_to_model;

var uploads_base = path.join(__dirname, "uploads");
var uploads = path.join(uploads_base, "u");

// define the schema for our user model
var imageSchema = mongoose.Schema({
	user_id: String,
	title: String,
	caption: String
});

imageSchema.plugin(filePlugin, {
    name: "img",
    upload_to: make_upload_to_model(uploads, 'photos'),
    relative_to: uploads_base
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Image', imageSchema);