const SP = require('../models/ServiceProvider');
const Announcement = require('../models/Announcement');
const Review = require('../models/Review');
const Video = require("../models/Video");
const Reservation = require('../models/Reservation');
const Assessment = require('../models/Assessment');
const Offer = require('../models/Offer');
const Student = require('../models/Student');
const User = require('../models/User');
const Interest = require('../models/Interests');
const jwt = require('../auth/jwt');



const spController = {
  postAnnouncement: function(req, res) {
    const token = req.headers['jwt-token'];
    jwt.verify(token, function(decoded) {
      if (decoded.type === 3) {
        const announcement = new Announcement({
          title: req.body.title,
          content: req.body.content,
          announcer_id: decoded.id,
          type: 'SPannouncement'

        }).save(function(err, announcement) {
          if (err) {
            res.status(500).json({
              status: 'error',
              message: err.message,
            });
          } else {
            res.status(200).json({
              status: 'success',
              data: {
                announcement,
              },
            });

          }
        });
      } else {
        res.status(500).json({
          err: err.message
        });
      }
    });
  },
  viewStudentsFinishedOffer: function(req, res) {
    const token = req.headers['jwt-token'];
    jwt.verify(token, function(decoded) {
      if (decoded.type === 3) {
        Offer.find({
          sp_id: decoded.id,
          end_date:{ $lt : Date.Now } 
          }, function(err, offers) {
            Reservation.find({
               offer_id: {$in: offers.offer_id}
              }, function(err, reservations) {
                User.find({
                  id: {$in: reservations.user_id}
                }, function(err, students){
                  if (err) {
                    res.status(500).json({
                      status: 'error',
                      message: err.message,
                    });
                  } else {
                    res.status(200).json({
                      status: 'success',
                      data: {
                        students
                      }
                    });
                  }
                });
             });

        });
      } else {
        res.status(500).json({
          err: err.message
        });
      }
    });
  },
  viewReviews: function(req, res) {
    const token = req.headers['jwt-token'];
    jwt.verify(token, function(decoded) {
      if (decoded.type === 3) 
      {
            Review.find({sp_id: decoded.id}).populate('reviewer_id').populate('sp_id').exec(function (err, reviews) 
            {
            
                if (err) {
                  res.status(500).json({
                    status: 'error',
                    message: err.message,
                  });
                }
                else
                {                
                   res.status(200).json({
                   status: 'success',
                   data: {
                    reviews,
                  },
                  });
                }
            });
      } else 
      {
        res.status(500).json({
          err: err.message
        });
      }
    });
  },
  viewInterests: function(req, res) { //all interests
    const token = req.headers['jwt-token'];
    jwt.verify(token, function(decoded) {
      if (decoded.type === 3) {
        const interests = Interest.find({
        }, function(err, interests) {
          if (err) {

            res.status(500).json({
              status: 'error',
              message: err.message,
            });
          } else {
            res.status(200).json({
              status: 'success',
              data: {
                interests
              },
            });
          }
        });
      } else {
        res.status(500).json({
          err: err.message
        });
      }
    });
  },
  assessStudent: function(req, res) {
    const token = req.headers['jwt-token'];
    jwt.verify(token, function(decoded) {
      if (decoded.type === 3) {
        const assessment = new Assessment({
          sp_id: decoded.id,
          user_id: req.params.id,
          rating: req.body.rating,
        }).save(function(err, assessment) {
          if (err) {
            res.status(500).json({
              status: 'error',
              message: err.message,
            });
          } else {
            res.status(200).json({
              obj: assessment
            });
          }
        });
      } else {
        res.status(200).json({
          status: 'success',
          data: {
            assessment,
          },
        });
      }
    });
  },
getAllSPProfiles: function(req, res) { //viewing a summary of all SP profiles
    const token = req.headers['jwt-token'];
    jwt.verify(token, function(decoded) {
          SP.find({}).populate('user_id').exec(function (err, users) 
          {
            if (err) 
            {
              res.status(500).json({
                 status: 'error',
                 message: err.message,
              });
            }
            else 
            {
              res.status(200).json({
                status: 'success',
                data: {
                message: 'summary of SP profiles retrieved successfully',
                users,
                },
              });
            }
          });

      });
  },

  getSPProfile: function(req, res) { //viewing a specific SP profile
    var query = {
      _id: req.params.id //Recently Changed to Params
    };

    SP.findOne(query, function(err, providerProfile) {
      User.findOne({_id:providerProfile.user_id},function(err, user){

      console.log(providerProfile);
      console.log(user);

      if (err) {
        res.status(500).json({
          status: 'error',
          message: err.message,
        });
      } else {
        res.status(200).json({
          status: 'success',
          data: {
            providerProfile,
            user
          }
        });
      }});
    });

  },

  //method used to add a video to the database
  addVideoByURL: function(req, res) {
    const token = req.headers['jwt-token'];
    jwt.verify(token, function(decoded) {
      if (decoded.type === 3) {
        const user_id = decoded.id;
        var title = req.body.title;
        var url = req.body.videoURL;
        //creating the new video instance in the database
        var newVideo = new Video({
          user_id: user_id,
          title: title,
          url: url

        });
        newVideo.save(function(err, video) {
          if (err) {
            res.status(500).json({
              status: 'error',
              message: err,
            });

          } else {
            res.status(200).json({
              status: 'success',
              data: video.url,
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


  //getting the embeded video object for the front end to embed it
  getVideo: function(req, res) {
    var query = {
      user_id: req.params.id //Recently Changed to Params
    };
    
    Video.find(query).populate('user_id').exec(function (err, story) {
        if (err) 
        {
          res.status(500).json({
            status: 'error',
            message: err.message,
          });
        }
        else
        {
            res.status(200).json({
              status: 'success',
              data: {
              video,
            },
          });
        }
    });
  },
  editSP: function(req, res) { //SP edits his profile
    const token = req.headers['jwt-token'];
    jwt.verify(token, function(decoded) {
      if (decoded.type === 3) {
        User.find({
          id: decoded.id
        }, function(err, user) {
          if (err)
            res.status(500).json({
              status: 'error',
              message: err.message,
            });
          else {
            SP.find({
              user_id: decoded.id
            }, function(err, sp) {
              if (err)
                res.status(500).json({
                  status: 'error',
                  message: err.message,
                });
              else {
                
                var price_category = req.body.price_category
                var location = req.body.location
                var description = req.body.description
                var fields = req.body.fields
                var phone_number = req.body.phone_number

                SP.update({
                  user_id: decoded.id
                }, {
                  price_category :price_category,
                  location :location,
                  description:description,
                  fields:fields,
                  phone_number:phone_number
                }, function(err, sp1) {
                  if (err)
                    res.status(500).json({
                      status: 'error',
                      message: err.message,
                    });
                  else {
                    res.json({
                      mssg: 'sp updated'
                    });
                  }
                });
              }
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
  viewProfile: function(req, res) { //viewing my SP profile
    const token = req.headers['jwt-token'];
    jwt.verify(token, function(decoded) {
      if (decoded.type === 3) {
        var query = {
          user_id: decoded.id
        };
        SP.findOne(query, function(err, providerProfile) {
          if (err) {
            res.status(500).json({
              status: 'error',
              message: err.message,
            });
          } else {
            User.find({_id:decoded.id}, function(err, user){
              res.status(200).json({
              status: 'success',
              data: {
                user,
                providerProfile
              },
            });
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
  viewMyInterests: function(req, res) { //SPs interests
    const token = req.headers['jwt-token'];
    jwt.verify(token, function(decoded) {
      if (decoded.type === 3) {
        const interests = SP.find({
          user_id: decoded.id
        }, function(err, sp) {
          if (err) {

            res.status(500).json({
              status: 'error',
              message: err.message,
            });
          } else {
            Interest.find({
              name: {
                $in: sp.fields
              }
            }, function(err, interests){
              if (err) {
                res.status(500).json({
                  status: 'error',
                  message: err.message,
                });
              } else {
                res.status(200).json({
                  status: 'success',
                  data: {
                    interests
                  },
                });
              }

            });
          }
        });
      } else {
        res.status(500).json({
          err: err.message
        });
      }
    });
  }

};

module.exports = spController;
