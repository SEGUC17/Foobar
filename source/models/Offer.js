// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var offerSchema = mongoose.Schema({
	title: String,
   	price: Number,
    sp_id: String,
    field: String,
    description: String,
    due_date: Date,
    start_date: Date,
    end_date: Date
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Offer', offerSchema);