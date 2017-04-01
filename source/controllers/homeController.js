let Offer = require('../models/Offer');
let Interest = require('../models/Interests');
let SI = require('../models/StudentInterest');
let Student = require('../models/Student');
let SP = require('../models/ServiceProvider');

let homeController = {
  findProfile: function(req, res) {
    var type = req.user.type;
    if (type == 1) {
      Console.log("Admin logged in");
    } else if (type == 2) {
      Student.find({
        user_id: req.user.id
      }, function(err, student) {
        if (err)
          res.send(err.message);
        else {
          // Return
          Console.log("Studdent logged in");
        }
      });
    } else if (type == 3) {
      SP.find({
        user_id: req.user.id
      }, function(err, sp) {
        if (err)
          res.send(err.message);
        else {
          // Return
          Console.log("Service Provider logged in");
        }
      });
    }
  },
  viewOffers: function(req, res) {

    if (user.type == 2) {
      SI.find({
        student_id: user.id
      }, function(err, studentinterests) {
        if (err)
          res.send(err.message);
        else {
          Interest.find({
            id: {
              $in: studentinterests.interest_id
            }
          }, function(err, interests) {
            if (err)
              res.send(err.message);
            else {
              Offer.find({
                field: {
                  $in: interests.name
                }
              }, function(err, offers) {
                if (err)
                  res.send(err.message);
                else {
                  // Return
                  Console.log("Viewing offers");
                }
              });
            }
          });
        }
      });

    } else {
      Offer.find({}, {
        limit: 10
      }, function(err, offers) {
        if (err)
          res.send(err.message);
        else {
          // Return
          Console.log("Viewing offers");
        }
      });
    }

  }

};

module.exports = homeController;
