// load the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Offer = require('./Offer');

// define the schema for our user model
const tagSchema = mongoose.Schema({
	name: String,
	offer_id: {type: Schema.Types.ObjectId, ref: 'Offer' }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Tag', tagSchema);
