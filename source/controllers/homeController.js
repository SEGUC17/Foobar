let Offer = require('../models/Offer');
let Interest = require('../models/Interests');
let SI = require('../models/StudentInterest');
let Student = require('../models/Student');
let SP = require('../models/ServiceProvider');

let homeController = {
  findProfile: function(req, res) {
    const user = req.user;
    if (user && user.type == 1) {
      res.json("Admin logged in");
    } else if (user && user.type == 2) {
      Student.find({
        user_id: req.user.id
      }, function(err, student) {
        if (err)
          res.send(err.message);
        else {
          // Return
          res.json({
            message: "Student logged in",
            user: user
          });
        }
      });
    } else if (user && user.type == 3) {
      SP.find({
        user_id: req.user.id
      }, function(err, sp) {
        if (err)
          res.send(err.message);
        else {
          // Return
          res.json("Service Provider logged in");
        }
      });
    } else{
      res.send("No user logged in");
    }
  },
  viewOffers: function(req, res) {
    const user = res.locals.user;
    if (user && user.type == 2) {
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
                  res.json('Viewing offers');
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
          res.json({
            offers: offers
          });
        }
      });
    }

  }

};

module.exports = homeController;
