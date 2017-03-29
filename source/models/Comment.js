// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var commentSchema = mongoose.Schema({
	commenter_id: String,
    review_id: String,
    content: String
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Comment', commentSchema);