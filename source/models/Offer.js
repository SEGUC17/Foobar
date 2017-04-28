
// load the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const textSearch = require('mongoose-text-search');

// define the schema for our user model
const offerSchema = mongoose.Schema({
	title: {
		type: String,
		text: true
	},
	price: Number,
	sp_id: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	capacity: Number,
	field: String,
	description: String,
	due_date: Date,
	start_date: Date,
	end_date: Date
});
offerSchema.plugin(textSearch);
offerSchema.path('title').index({
	text: true
});
// add a text index to the tags array
// offerSchema.index({
// 	title: '$text'
// });
// create the model for users and expose it to our app
module.exports = mongoose.model('Offer', offerSchema);