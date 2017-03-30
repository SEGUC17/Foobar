// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var reviewSchema = mongoose.Schema({
	rating: Number,
	reviewer_id: String,
	content: Text,
	sp_id: String
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Review', reviewSchema);
