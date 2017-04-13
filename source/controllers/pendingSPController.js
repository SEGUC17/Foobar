const PendingSP = require('../models/PendingSP');
//  getting all the service providers that applied to our system
const pendingSPController = {

  getAllPendingSP(req, res) { // viewing all pending SP requests
    PendingSP.find((err, pendingSP) => {
      if (err) { // if error occurred
        res.status(500).json({
          status: 'error',
          message: err.message,
        });
        return undefined;
      }
      res.status(200).json({
        status: 'success',
        data: {
          pendingSP,
        },
      });
      return undefined;
    });
  },

  Apply(req, res) {
    const pending = new PendingSP({
      name: req.body.name,
      email: req.body.email,
      phone_number: req.body.phone_number,
      description: req.body.description,
      is_declined: false,
    });

    pending.save((err) => {
      if (err) {
        res.status(500).json({
          status: 'error',
          message: err.message,
        });
      } else {
        res.status(200).json({
          status: 'success',
          data: null,
        });
      }
    });
  },
};

module.exports = pendingSPController;
