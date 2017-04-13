// load the things we need
const mongoose = require('mongoose');

// define the schema for our user model
const ccSchema = mongoose.Schema({
  user_id: String,
  number: String,
  name: String,
  expiry_date: Date,
  type: String,
});

// create the model for users and expose it to our app
module.exports = mongoose.model('CreditCard', ccSchema);
