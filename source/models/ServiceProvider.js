  const mongoose = require('mongoose');

  // define the schema for our user model
  const ServiceProviderSchema = mongoose.Schema({
    price_category: String,
    user_id: {
      type: String,
      index: true
    },
    location: String,
    description: String,
    fields: [String],
    phone_number: String,
    is_blocked: Boolean,
    is_deleted: Boolean,
    first_login: Boolean

  });

  // create the model for users and expose it to our app
  module.exports = mongoose.model('ServiceProvider', ServiceProviderSchema);
