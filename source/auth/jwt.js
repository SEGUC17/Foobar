const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');

const secret = 'ilovescotchscotchyscotchscotch';

module.exports = {
  generate: function(credentials, cb) {
    User.findOne({
      name: credentials.username,
      password: credentials.password
    }, function(err, user) {
      if (!user) {
        return cb(null);
      }

      cb(jwt.sign({
        role: user.type,
      }, secret));
    });
  },
  verify: function(token) {
    jwt.verify(token, secret, function(err, decoded) {
      console.log(decoded.isAdmin);
    });
  }
};
