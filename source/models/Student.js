// load the things we need
const mongoose = require('mongoose');

// define the schema for our user model
const studentSchema = mongoose.Schema({
	user_id: String,
	university: String,
	address: String,
	birthdate: Date,
	is_deleted: Boolean,
	description: String
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Student', studentSchema);
