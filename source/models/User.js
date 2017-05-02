// load the things we need
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const path = require('path');
const filePluginLib = require('mongoose-file');

const filePlugin = filePluginLib.filePlugin;
const make_upload_to_model = filePluginLib.make_upload_to_model;

const uploads_base = path.join(__dirname, 'uploads');
const uploads = path.join(uploads_base, 'u');
// define the schema for our user model
const userSchema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  type: Number, // 1 for admin, 2 for Student, 3 Service Provider
  is_deleted: Boolean,
  is_blocked: Boolean,
});

userSchema.plugin(filePlugin, {
  name: 'profileimg',
  upload_to: make_upload_to_model(uploads, 'photos'),
  relative_to: uploads_base,
});

userSchema.methods.toJSON = function() {
  var obj = this.toObject()
  delete obj.password
  return obj
}


// methods ======================

// generating a hash
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
