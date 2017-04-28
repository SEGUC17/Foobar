// load the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');
var timestamps = require('mongoose-timestamp');


// define the schema for our user model
const announcementSchema = mongoose.Schema({
	title: String,
	announcer_id: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	content: String,
	type: String
});
announcementSchema.plugin(timestamps);


// create the model for users and expose it to our app
module.exports = mongoose.model('Announcement', announcementSchema);
