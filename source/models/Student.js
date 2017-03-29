// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var studentSchema = mongoose.Schema({
	user_id: String,
    university: String,
    address: String,
    birthdate: Date,
    description: String
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Student', studentSchema);