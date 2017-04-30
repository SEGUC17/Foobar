  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;
  const User = require('./User');

  // define the schema for our user model
  const ServiceProviderSchema = mongoose.Schema({
    price_category: String,
    user_id: {type: Schema.Types.ObjectId, ref: 'User' },
    location: String,
    description: String,
    fields: [String],
    phone_number: String,
    first_login: Boolean,
    lat: String,
    lang: String,

  });

  // create the model for users and expose it to our app
  module.exports = mongoose.model('ServiceProvider', ServiceProviderSchema);
