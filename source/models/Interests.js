// load the things we need
const mongoose = require('mongoose');

// define the schema for our user model
const interestSchema = mongoose.Schema({
  name: {
    type:String,
    unique:true,
  }

});

// create the model for users and expose it to our app
module.exports = mongoose.model('Interests', interestSchema);
