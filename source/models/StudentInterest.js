// load the things we need
const mongoose = require('mongoose');

// define the schema for our user model
const studentInterestSchema = mongoose.Schema({
  student_id: String,
  interest_id: String,
});

// create the model for users and expose it to our app
module.exports = mongoose.model('StudentInterest', studentInterestSchema);
