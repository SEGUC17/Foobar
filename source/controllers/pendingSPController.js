let PendingSP = require("../models/PendingSP");
const jwt = require('../auth/jwt');

//  getting all the service providers that applied to our system
let pendingSPController = {

  getAllPendingSP: function(req, res) { //viewing all pending SP requests
    const token = req.headers['jwt-token'];
    jwt.verify(token, function(decoded) {
      if (decoded.type === 1) {
        PendingSP.find(function(err, pendingSP) {

          if (err) { //if error occurred
            res.status(500).json({
              status: 'error',
              message: err.message,
            });


          } else {
            //  res.render('viewPendingSP', {pendingSP:pendingSP});
            res.status(200).json({
              status: 'success',
              data: {
                pendingSP,
              },
            });
          }
        });
      } else {
        res.status(500).json({
          err: 'unauthorized access'
        });
      }
    });
  },


  Apply: function(req, res) {

    const token = req.headers['jwt-token'];
    jwt.verify(token, function(decoded) {

      const pending = new PendingSP();

      pending.name = req.body.name;
      pending.email = req.body.email;
      pending.phone_number = req.body.phone_number;
      pending.description = req.body.description;
      pending.is_declined = false;
      // name : 'alaa',
      // email :'hey',
      // phone_number : 121,
      // description : 'hey ',
      // is_declined : true
      pending.save(function(err, pending) {
        if (err) {
          res.status(500).json({
            status: 'error',
            message: err.message,
          });
        } else {
          res.status(200).json({
            status: 'success',
            data: 'success',
          });
        }
      });

    });
  }
}

module.exports = pendingSPController;
