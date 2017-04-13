// load the things we need
const mongoose = require('mongoose');

// define the schema for our user model
const reviewSchema = mongoose.Schema({
  rating: Number,
  reviewer_id: String,
  content: String,
  sp_id: String,
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Review', reviewSchema);
