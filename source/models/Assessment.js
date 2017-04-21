// load the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');
const Interests = require('./Interests');
const Offer = require('./Offer');

// define the schema for our user model
const assessmentSchema = mongoose.Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  sp_id: { type: Schema.Types.ObjectId, ref: 'User'},
  rating: Number,
  field: String,
  offer_id: {type: Schema.Types.ObjectId, ref: 'Offer'}
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Assessment', assessmentSchema);
