// load the things we need
const mongoose = require('mongoose');

// define the schema for our user model
const skillSchema = mongoose.Schema({
	type: String,
	level: String,
	score: Number
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Skill', skillSchema);
