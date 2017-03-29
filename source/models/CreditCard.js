
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var ccSchema = mongoose.Schema({
	user_id: String,
	number: String,
	name: String,
	expiry_date: Date,
	type: String
});

// create the model for users and expose it to our app
module.exports = mongoose.model('CreditCard', ccSchema);