// load the things we need
const mongoose = require('mongoose');

// define the schema for our user model
const reservationSchema = mongoose.Schema({
	user_id: String,
	offer_id: String,
	service_provider_id: String,
	reservation_date: Date,
	status: String,
	is_assessed: Boolean
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Reservation', reservationSchema);
