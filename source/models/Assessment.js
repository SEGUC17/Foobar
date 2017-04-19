// load the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

// define the schema for our user model
const assessmentSchema = mongoose.Schema({
  user_id: { type: Schema.Types.ObjectId, ref: User },
  sp_id: { type: Schema.Types.ObjectId, ref: User},
  rating: Number
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Assessment', assessmentSchema);
