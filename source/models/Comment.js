// load the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');
const Review = require('./Review');


// define the schema for our user model
const commentSchema = mongoose.Schema({
	commenter_id: {type: Schema.Types.ObjectId, ref: 'User' },
	review_id: {type: Schema.Types.ObjectId, ref: 'Review' },
	content: String
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Comment', commentSchema);
