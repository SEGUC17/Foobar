// load the things we need
const mongoose = require('mongoose');

// define the schema for our user model
const announcementSchema = mongoose.Schema({
	title: String,
	announcer_id: String,
	content: String,
	type: String
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Announcement', announcementSchema);
