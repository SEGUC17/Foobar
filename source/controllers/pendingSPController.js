let PendingSP = require("../models/PendingSP");
//  getting all the service providers that applied to our system
let pendingSPController = {

  getAllPendingSP: function(req, res) { //viewing all pending SP requests

    PendingSP.find(function(err, pendingSP) {

      if (err) { //if error occurred
        res.send(err.message);

        console.log("error");
      } else {
        //  res.render('viewPendingSP', {pendingSP:pendingSP});
        console.log('pending SP requests retrieved successfully');
      }
    });
  },


  Apply: function(req, res) {


    const pending = new PendingSP();

    pending.name = req.body.name;
    pending.email = req.body.email;
    pending.phone_number = req.body.phone_number;
    pending.description = req.body.description;
    pending.is_declined = 'false';
    // name : 'alaa',
    // email :'hey',
    // phone_number : 121,
    // description : 'hey ',
    // is_declined : true
    pending.save(function(err, pending) {
      if (err) {
        res.json(err.message);
      } else {
        res.json(pending);
      }
    });
  }
};

module.exports = pendingSPController;
