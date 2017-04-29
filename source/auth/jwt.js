const jwt = require('jsonwebtoken');
const User = require('../models/User');

const secret = 'ilovescotchscotchyscotchscotch';

module.exports = {
  generate(credentials, cb) {
    User.findOne({
      email: credentials.email,
      password: credentials.password,
    }, (err, user) => {
      if (!user) {
        return cb(null);
      }
      else if(user){
        var validpass = user.validPassword(credentials.password);
        if(!validpass){
          console.log('wrongpass');
        }
        else{
           cb(jwt.sign({
        id: user.id,
        name: user.name,
        type: user.type,
        image: user.profileimg,
      }, secret));
        }
      }
     
    });
  },
  verify(token, cb) {
    jwt.verify(token, secret, (err, decoded) => {
      cb(decoded);
    });
  },

};
