// load the things we need
const mongoose = require('mongoose');

// define the schema for our user model
const tagSchema = mongoose.Schema({
	name: String,
	offer_id: String
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Tag', tagSchema);
