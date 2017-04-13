// load the things we need
const mongoose = require('mongoose');

// define the schema for our user model
const videoSchema = mongoose.Schema({
  user_id: String,
  title: String,
  url: String,
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Video', videoSchema);
