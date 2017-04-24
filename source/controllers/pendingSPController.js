const PendingSP = require('../models/PendingSP');
const jwt = require('../auth/jwt');

//  getting all the service providers that applied to our system
const pendingSPController = {

  getAllPendingSP(req, res) { // viewing all pending SP requests
      const token = req.headers['jwt-token'];
      jwt.verify(token, (decoded) => {
        if (decoded.type === 1) {
          PendingSP.find((err, pendingSP) => {
            if (err) { // if error occurred
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
            err: 'unauthorized access',
          });
        }
      });
    },

    //service provider applying to be on our platform
    Apply(req, res) {
      req.checkBody('name', 'Name is required').notEmpty();
      req.checkBody('email', 'Email is required').notEmpty();
      req.checkBody('email', 'Please enter a Vaild Email').isEmail();
      req.checkBody('phone_number', 'A Phone Number is required').notEmpty();
      req.checkBody('description', 'Description is required').notEmpty();


      var errors = req.validationErrors();

      if (errors) {
        res.status(400).json({
          err: errors

        });
      } else {
        const token = req.headers['jwt-token'];
        jwt.verify(token, (decoded) => {
          const pending = new PendingSP();

          pending.name = req.body.name;
          pending.email = req.body.email;
          pending.phone_number = req.body.phone_number;
          pending.description = req.body.description;
          pending.is_declined = false;
          pending.save((err, pending) => {
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
    },
};

module.exports = pendingSPController;
