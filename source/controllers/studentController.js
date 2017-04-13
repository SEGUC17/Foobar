const User = require('../models/User');
const Offer = require('../models/Offer');
const Reservation = require('../models/Reservation');
const Skill = require('../models/Skill');
const Tag = require('../models/Tag');
const StudentInterest = require('../models/StudentInterest');
const Review = require('../models/Review');
const Student = require('../models/Student');
const Interests = require('../models/Interests');

const StudentController = {


  approveReservation(req, res) {
    Reservation.findOne({
      id: req.params.id,
    }, (err, reservation) => {
      if (err) {
        res.status(500).json({
          status: 'error',
          message: err.message,
        });
      } else {
        const reservationfound = reservation;
        reservationfound.status = 1;
        reservationfound.save((saveerr) => {
          if (saveerr) {
            res.status(500).json({
              status: 'error',
              message: saveerr.message,
            });
          } else {
            res.status(200).json({
              status: 'success',
              data: {
                message: 'Approved',
              },
            });
          }
        });
      }
    });
  },


  addReview(req, res) {
    const user = req.user;
    const review = new Review({
      reviewer_id: user.id,
      sp_id: req.body.id,

    });
    review.save((err) => {
      if (err) {
        res.status(500).json({
          status: 'error',
          message: err.message,
        });
      } else {
        res.status(200).json({
          status: 'success',
          data: {
            review,
          },
        });
      }
    });
  },
  search(req, res) {
    const search = new RegExp(`^${req.query.search}$`, 'i');
    let tagsfound = [];
    Tag.find({
      name: search,
    }, (err, tagsarray) => {
      if (err) {
        res.status(500).json({
          status: 'error',
          message: err.message,
        });
      } else {
        tagsfound = tagsarray;
      }
    });
    const tagsarraysids = [];
    tagsfound.forEach((element) => {
      tagsarraysids.push(element.offer_id);
    }, this);
    Offer.find({
      $and: [{
        $or: [{
          title: search,
        }, {
          field: search,
        }, {
          description: search,
        }, {
          offer_id: {
            $in: tagsarraysids,
          },
        }],
      }, {
        due_date: {
          $lt: Date.now(),
        },
      }],
      function(err, offers) {
        if (err) {
          res.status(500).json({
            status: 'error',
            message: err.message,
          });
        } else {
          res.status(200).json({
            status: 'success',
            data: {
              offers,
            },
          });
        }
      },
    });
  },
  seeProgress(req, res) {
    const user = req.user;
    Skill.find({
      user_id: user.id,
    }, (err, skills) => {
      if (err) { res.json(err.message); } else {
        res.status(200).json({
          status: 'success',
          data: {
            skills,
          },
        });
      }
    });
  },
  applyOffer(req, res) {
    Offer.find({
      id: req.params.id,
    }, (err, offer) => {
      if (err) {
        res.status(500).json({
          status: 'error',
          message: err.message,
        });
      } else if (offer.due_date < Date.now()) {
        res.status(403).json({
          status: 'error',
          message: "You can't register now",
        });
      } else if (offer.slots_available > 0) {
        const reservation = new Reservation({
          user_id: req.user.id,
          offer_id: offer.id,
          service_provider_id: offer.sp_id,
          reservation_date: Date.now(),
          status: 2,
        });
        reservation.save((ressaveerr) => {
          if (ressaveerr) {
            res.status(500).json({
              status: 'error',
              message: ressaveerr.message,
            });
          } else {
            const offerfound = offer;
            offerfound.slots_available -= 1;
            offerfound.save((saveerr) => {
              if (saveerr) {
                res.status(500).json({
                  status: 'error',
                  message: saveerr.message,
                });
              } else {
                res.status(200).json({
                  status: 'success',
                  data: {
                    reservation,
                  },
                });
              }
            });
          }
        });
      } else {
        res.status(304).json({
          status: 'error',
          message: 'No spots available',
        });
      }
    });
  },
  viewStudent(req, res) {
    User.find({
      id: req.params.id,
    }, (err, user) => {
      if (err) {
        res.status(500).json({
          status: 'error',
          message: err.message,
        });
      } else {
        Student.find({
          user_id: user.id,
        }, (finderr, student) => {
          if (finderr) {
            res.status(500).json({
              status: 'error',
              message: err.message,
            });
          } else {
          // Render
            res.status(200).json({
              status: 'success',
              data: {
                message: 'Found the hoe',
                student,
              },
            });
          }
        });
      }
    });
  },
  editStudent(req, res) {
    User.find({
      id: req.params.id,
    }, (err, user) => {
      if (err) {
        res.status(500).json({
          status: 'error',
          message: err.message,
        });
      } else {
        Student.find({
          user_id: user.id,
        }, (finderr, student) => {
          if (finderr) {
            res.status(500).json({
              status: 'error',
              message: finderr.message,
            });
          } else {
            const name = req.body.name;
            const university = req.body.university;
            const address = req.body.address;
            const birthdate = req.body.birthdate;
            const description = req.body.description;

            StudentInterest.remove({
              student_id: student.user_id,
            }, (removeerr) => {
              if (removeerr) {
                res.status(500).json({
                  status: 'error',
                  message: removeerr.message,
                });
              }
            });

            for (let i = 0; i < Interests.length; i += 1) {
              const newInterset = new StudentInterest({
                student_id: user.id,
                interest_id: Interests[i],
              });

              newInterset.save((saveerr) => {
                if (err) {
                  res.status(500).json({
                    status: 'error',
                    message: saveerr.message,
                  });
                }
              });
            }

            User.update({
              id: user.id,
            }, {
              name,
            }, (userupdateerr) => {
              if (userupdateerr) {
                res.status(500).json({
                  status: 'error',
                  message: userupdateerr.message,
                });
              }
            });
            Student.update({
              id: user.id,
            }, {
              university,
              address,
              birthdate,
              description,
            }, (updateerr) => {
              if (updateerr) {
                res.status(500).json({
                  status: 'error',
                  message: updateerr.message,
                });
              } else {
                res.status(200).json({
                  status: 'success',
                  data: {
                    message: 'Updated',
                  },
                });
              }
            });
          }
        });
      }
    });
  },
};

module.exports = StudentController;
