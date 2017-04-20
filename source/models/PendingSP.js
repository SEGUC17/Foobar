// load the things we need
const mongoose = require('mongoose');
 

// define the schema for our user model
const pendingSPSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  phone_number: String,
  description: String,
  is_declined: Boolean
});

// create the model for users and expose it to our app
module.exports = mongoose.model('PendingSP', pendingSPSchema);
