// load the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');
const Offer = require('./Offer');

// define the schema for our user model
const reservationSchema = mongoose.Schema({
	user_id: {type: Schema.Types.ObjectId, ref: 'User' },
	offer_id: {type: Schema.Types.ObjectId, ref: 'Offer' },
	service_provider_id: {type: Schema.Types.ObjectId, ref: 'User' },
	reservation_date: Date,
	status: Number,//0 = applied , 1=approved, 2=disapproved
	is_assessed: Boolean
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Reservation', reservationSchema);
