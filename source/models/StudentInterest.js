// load the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');
const Interests = require('./Interests');

// define the schema for our user model
const studentInterestSchema = mongoose.Schema({
	student_id: {type: Schema.Types.ObjectId, ref: 'User' },
	interest_id: {type: Schema.Types.ObjectId, ref: 'Interests' }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('StudentInterest', studentInterestSchema);
