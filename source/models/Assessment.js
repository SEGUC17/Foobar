// load the things we need
const mongoose = require('mongoose');

// define the schema for our user model
const assessmentSchema = mongoose.Schema({
  user_id: String,
  sp_id: String,
  rating: Number
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Assessment', assessmentSchema);
