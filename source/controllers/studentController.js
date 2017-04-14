let User = require('../models/User');
let Offer = require('../models/Offer');
let Reservation = require('../models/Reservation');
let Skill = require('../models/Skill');
let Tag = require('../models/Tag');
let StudentInterest = require('../models/StudentInterest');
let Review = require('../models/Review');
let Student = require('../models/Student');
let Interests = require('../models/Interests');
const jwt = require('../auth/jwt');
var ObjectId = require('mongodb').ObjectID;


// const ServiceProvider = require('../models/ServiceProvider');

const StudentController = {



  approveReservation: function(req, res) {
    const token = req.headers['jwt-token'];
    jwt.verify(token, function(decoded) {
      if (decoded.type === 3) {
        Reservation.findOne({
          id: req.params.id
        }, function(err, reservation) {
          if (err)
            res.json(err.message);
          else {
            reservation.status = 1;
            reservation.save(function(err, reservation) {
              if (err) {
                res.json(err.message);
                console.log(err);
              } else {
                res.json("Approved successfully");
              }
            });
          }

        });
      } else {
        res.json({
          err: 'unauthorized access'
        });
      }
    });
  },


  addReview: function(req, res) {
    const token = req.headers['jwt-token'];
    jwt.verify(token, function(decoded) {
      if (decoded.type === 2) {
        const review = new Review({
          reviewer_id: decoded.id,
          sp_id: req.params.id,
          rating: req.body.rating,
          content: req.body.content

        }).save(function(err, review) {
          if (err) {
            res.json(err.message);
          } else {
            res.json(review);
          }
        });
      } else {
        res.json({
          err: 'unauthorized access'
        });
      }
    });
  },
  search: function(req, res) {
    const search = new RegExp('^' + req.query.search + '$', "i")

    Tag.find({
      name: search
    }, function(err, tagsarray) {
      if (err)
        res.json(err.message);
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
          res.json(err.message);
        else {
          console.log("found offers");
          //Render offers
        }
      }
    });
  },
  seeProgress: function(req, res) {
    const token = req.headers['jwt-token'];
    jwt.verify(token, function(decoded) {
      if (decoded.type === 2) {
        Skill.find({
          user_id: decoded.id
        }, function(err, skills) {
          if (err)
            res.json(err.message);
          else {
            res.json(skills);
          }
        });
      } else {
        res.json({
          err: 'unauthorized access'
        });
      }
    });
  },
  applyOffer: function(req, res) {
    const token = req.headers['jwt-token'];
    jwt.verify(token, function(decoded) {
      if (decoded.type === 2) {
        Offer.find({
          'id': ObjectId(req.params.id)
        }, function(err, offer) {
          if (err)
            res.json(err.message);
          else {
            console.log(offer);
            if (offer.due_date < Date.now()) {
              res.json("You can't register now");
            } else {
              if (offer.capacity > 0) {
                const reservation = new Reservation({
                  user_id: decoded.id,
                  offer_id: offer.id,
                  service_provider_id: offer.sp_id,
                  reservation_date: Date.now(),
                  status: 2
                });
                reservation.save(function(err, reservation) {
                  if (err) {
                    res.json(err.message);
                  } else {
                    offer.capacity = offer.capacity -
                      1;
                    offer.save(function(err, reservation) {
                      if (err) {
                        res.json(err.message);
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
                res.json("There are no places in this course");
              }
            }
          }
        });
      } else {

        res.json({
          err: 'unauthorized access'
        });
      }
    });
  },
  viewStudent: function(req, res) {
    User.find({
      _id: req.params.id
    }, function(err, user) {
      if (err)
        res.json(err.message);
      else {
        Student.find({
          user_id: req.params.id
        }, function(err, student) {
          //Render
          res.json({
            student: student,
            user: user
          });
        });
      }
    });
  },
  editStudent: function(req, res) {
    const token = req.headers['jwt-token'];
    jwt.verify(token, function(decoded) {
      if (decoded.type === 2) {
        User.find({
          id: decoded.id
        }, function(err, user) {
          if (err)
            res.json(err.message);
          else {
            Student.find({
              user_id: decoded.id
            }, function(err, student) {
              if (err)
                res.json(err.message);
              else {
                // user.name = req.body.name;
                // student.university = req.body.university;
                // student.address = req.body.address;
                // student.birthdate = req.body.birthdate;
                // student.description = req.body.description;

                var name = req.body.name;
                var university = req.body.university;
                var address = req.body.address;
                var birthdate = req.body.birthdate;
                var description = req.body.description;

                StudentInterest.remove({
                  student_id: student.user_id
                }, function(err) {
                  if (err) {
                    res.json(
                      "Can't delete Student Interest"
                    );
                  }
                });

                for (var i = 0; i < Interests.length; i++) {
                  var newInterset = new StudentInterest({
                    student_id: decoded.id,
                    interest_id: Interests[i]
                  });

                  newInterset.save(function(err) {
                    if (err)
                      res.json(
                        "Student interests updating error "
                      );
                  });
                }

                User.update({
                  id: decoded.id
                }, {
                  name: name
                }, function(err, u1) {
                  if (err)
                    res.json(err.message);
                  else {
                    res.json('uname updated');
                  }
                });
                Student.update({
                  id: decoded.id
                }, {
                  university: university,
                  address: address,
                  birthdate: birthdate,
                  description: description
                }, function(err, student1) {
                  if (err)
                    res.json(err.message);
                  else {
                    res.json('student updated');
                  }
                });



                // user.save(function(err) {
                //   if (err)
                //     console.log('error');
                //   else {
                //     student.save(function(err) {
                //       if (err)
                //         console.log('error');
                //       else {}
                //       // Render

                //     });
                //   }
                // });

              }
            });
          }

        });
      } else {

      }
    });
  }
}

module.exports = StudentController;
