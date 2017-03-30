// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var reservationSchema = mongoose.Schema({
	user_id: Number,
	offer_id: String,
	service_provider_id: String,
	reservation_date: Date,
	status: String
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Reservation', reservationSchema);
