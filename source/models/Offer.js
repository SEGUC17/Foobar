// load the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

// define the schema for our user model
const offerSchema = mongoose.Schema({
	title: String,
	price: Number,
	sp_id: {type: Schema.Types.ObjectId, ref: 'User' },
	capacity: Number,
	field: String,
	description: String,
	due_date: Date,
	start_date: Date,
	end_date: Date
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Offer', offerSchema);
