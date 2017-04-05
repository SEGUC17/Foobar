let User = require('../models/User');
let Offer = require('../models/Offer');
let Reservation = require('../models/Reservation');
let Skill = require('../models/Skill');
let Tag = require('../models/Tag');
let StudentInterest = require('../models/StudentInterest');
let Review = require('../models/Review');
// const ServiceProvider = require('../models/ServiceProvider');

const StudentController = {



  approveReservation: function(req, res) {

    Reservation.findOne({
      id: req.params.id
    }, function(err, reservation) {
      if (err)
        res.send(err.message);
      else {
        reservation.status = 1;
        reservation.save(function(err, reservation) {
          if (err) {
            res.send(err.message);
            console.log(err);
          } else {
            res.send("Approved successfully");
          }
        });
      }

    });
  },


  addReview: function(req, res) {
    const user = req.user;
    const review = new Review({
      reviewer_id: user.id,
      sp_id = req.body.id,

    }).save(function(err, review) {
      if (err) {
        res.send(err.message);
      } else {
        console.log(review);
      }
    });
  },
  search: function(req, res) {
    const search = new RegExp('^' + req.query.search + '$', "i")

    Tag.find({
      name: search
    }, function(err, tagsarray) {
      if (err)
        res.send(err.message);
    });

    Offer.find({
      $and: [{
        $or: [{
          title: search
        }, {
          field: search
        }, {
          description: search
        }, {
          offer_id: {
            $in: tagsarray.offer_id
          }
        }]
      }, {
        due_date: {
          $lt: Date.now()
        }
      }],
      function(err, offers) {
        if (err)
          res.send(err.message);
        else {
          console.log("found offers");
          //Render offers
        }
      }
    });
  },
  seeProgress: function(req, res) {
    Skill.find({
      user_id: user.id
    }, function(err, skills) {
      if (err)
        res.send(err.message);
      else {
        //Render Skills
      }
    });
  },
  applyOffer: function(req, res) {
    Offer.find({
      id: req.params.id
    }, function(err, offer) {
      if (err)
        res.send(err.message);
      else {
        if (offer.due_date < Date.now()) {
          Console.log("You can't register now");
        } else {
          if (offer.slots_available > 0) {
            const reservation = new Reservation({
              user_id: req.user.id,
              offer_id: offer.id,
              service_provider_id: offer.sp_id,
              reservation_date: Date.now(),
              status: 2
            });
            reservation.save(function(err, reservation) {
              if (err) {
                res.send(err.message);
                console.log(err);
              } else {
                offer.slots_available = offer.slots_available - 1;
                offer.save(function(err, reservation) {
                  if (err) {
                    res.send(err.message);
                    console.log(err);
                  } else {
                    res.json({
                      message: "yo"
                    });
                  }
                });
              }
            });
          } else {
            Console.log("There are no places in this course");
          }
        }
      }
    });
  },
  viewStudent: function(req, res) {
    User.find({
      id: req.params.id
    }, function(err, user) {
      if (err)
        res.send(err.message);
      else {
        Student.find({
          user_id: user.id
        }, function(err, student) {
          //Render
          console.log("Found the hoe.");

        });
      }
    });
  },
  editStudent: function(req, res) {
    User.find({
      id: req.params.id
    }, function(err, user) {
      if (err)
        res.send(err.message);
      else {
        Student.find({
          user_id: user.id
        }, function(err, student) {
          if (err)
            res.send(err.message);
          else {
            user.name = req.body.name;
            student.university = req.body.university;
            student.address = req.body.address;
            student.birthdate = req.body.birthdate;
            student.description = req.body.description;

            StudentInterest.remove({
              student_id: student.user_d
            }, function(err) {
              if (err) {
                Console.log("Can't delete Student Interest");
              }
            });

            for (var i = 0; i < Interests.length; i++) {
              var newInterset = new StudentInterest({
                student_id: newUser.id,
                interest_id: Interests[i]
              });

              newInterset.save(function(err) {
                if (err)
                  Console.log(
                    "Student interests updating error ");
              });
            }

            user.save(function(err) {
              if (err)
                console.log('error');
              else {
                student.save(function(err) {
                  if (err)
                    console.log('error');
                  else {}
                  // Render

                });
              }
            });

          }
        });
      }

    });
  }
};

module.exports = StudentController;
