// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var skillSchema = mongoose.Schema({
	type: String,
	level: String,
	score: int
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Skill', skillSchema);