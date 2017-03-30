// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var path = require('path');

var filePluginLib = require('mongoose-file');
var filePlugin = filePluginLib.filePlugin;
var make_upload_to_model = filePluginLib.make_upload_to_model;

var uploads_base = path.join(__dirname, "uploads");
var uploads = path.join(uploads_base, "u");



// define the schema for our user model
var userSchema = mongoose.Schema({
	name: String,
	// local: {

	email: {
		type: String,
		unique: true
	},
	password: String,
	// },
	type: Number,
	is_deleted: Boolean
		//1 for admin, 2 for Student, 3 Service Provider
});

userSchema.plugin(filePlugin, {
	name: "profileimg",
	upload_to: make_upload_to_model(uploads, 'photos'),
	relative_to: uploads_base
});


// methods ======================

// generating a hash
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
