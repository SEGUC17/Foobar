// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var announcementSchema = mongoose.Schema({
	title: String,
   	announcer_id: String, 
    content: Text
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Announcement', announcementSchema);