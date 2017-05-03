const SP = require('../models/ServiceProvider');
const Announcement = require('../models/Announcement');
const Review = require('../models/Review');
const Comment = require('../models/Comment');
const Video = require('../models/Video');
const Reservation = require('../models/Reservation');
const Assessment = require('../models/Assessment');
const Offer = require('../models/Offer');
const Student = require('../models/Student');
const User = require('../models/User');
const Interest = require('../models/Interests');
const Image = require('../models/Image');
const jwt = require('../auth/jwt');
var getYouTubeID = require('get-youtube-id');


const spController = {
  postAnnouncement(req, res) {
      req.checkBody('title', 'Title is required').notEmpty();
      req.checkBody('content', 'Content is required').notEmpty();

      var errors = req.validationErrors();

      if (errors) {
        //  //console.log(errors);
        res.status(400).json({
          err: errors

        });
      } else {
        const token = req.headers['jwt-token'];
        jwt.verify(token, (decoded) => {
          if (decoded.type === 3) {
            const announcement = new Announcement({
              title: req.body.title,
              content: req.body.content,
              announcer_id: decoded.id,
              type: 'SPannouncement',

            }).save((err, announcement) => {
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
              err: err.message,
            });
          }
        });
      }
    },
    getImages(req, res) {
      const query = {
        user_id: req.params.id, // Recently Changed to Params
      };

      Image.find(query).exec((err, images) => {
        if (err) {
          res.status(500).json({
            status: 'error',
            message: err.message,
          });
        } else {
          //    //console.log(images)
          res.status(200).json({
            status: 'success',
            data: {
              images,
            },
          });
        }
      });
    },
    viewStudentsFinishedOffer(req, res) {

      const token = req.headers['jwt-token'];
      jwt.verify(token, function(decoded) {
        if (decoded.type === 3) {
          var d = new Date();
          var n = d.toISOString();
          Offer.find({
            sp_id: decoded.id,
            end_date: {
              $lt: n
            }
          }, function(err, offers) {
            if (err) {
              res.status(500).json({
                status: 'error',
                message: err.message,
              })
            } else {
              //      //console.log(offers);
              var offers_ids = [];
              var i = offers.length - 1;
              for (i; i > -1; i--) {
                offers_ids[i] = offers[i]._id;
              }
              //  //console.log(offers_ids);

              Reservation.find({
                offer_id: {
                  $in: offers_ids
                },
                is_assessed: false
              }).populate('user_id', {
                password: 0
              }).populate('offer_id').exec((err,
                students) => {
                if (err) {
                  res.status(500).json({
                    status: 'error',
                    message: err.message,
                  });
                } else {
                  res.status(200).json({
                    status: 'success',
                    data: {
                      students,
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
    },
    viewReviews(req, res) {
      const token = req.headers['jwt-token'];


      jwt.verify(token, (decoded) => {
        if (decoded.type === 3) {
          Review.find({
            sp_id: decoded.id
          }).populate('reviewer_id', {
            password: 0
          }).populate('sp_id', {
            password: 0
          }).exec((err,
            reviews) => {
            if (err) {
              res.status(500).json({
                status: 'error',
                message: err.message,
              });
            } else {
              //console.log(reviews)
              res.status(200).json({
                status: 'success',
                data: {
                  reviews,
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
    viewComments(req, res) {
      const token = req.headers['jwt-token'];
      jwt.verify(token, (decoded) => {
        Comment.find({
          review_id: req.body.review_id
        }).populate('commenter_id', {
          password: 0
        }).exec((err, comments) => {
          if (err) {
            res.status(500).json({
              status: 'error',
              message: err.message,
            });
          } else {
            res.status(200).json({
              status: 'success',
              data: {
                comments,
              },
            });
          }
        });
      });
    },
    viewInterests(req, res) { // all interests
      const token = req.headers['jwt-token'];
      jwt.verify(token, (decoded) => {
        if (decoded.type === 3) {
          const interests = Interest.find({}, (err, interests) => {
            if (err) {
              res.status(500).json({
                status: 'error',
                message: err.message,
              });
            } else {
              res.status(200).json({
                status: 'success',
                data: {
                  interests,
                },
              });
            }
          });
        } else {
          res.status(500).json({
            err: err.message,
          });
        }
      });
    },
    assessStudent(req, res) {
      req.checkBody('rating', 'Rating is required').notEmpty();


      var errors = req.validationErrors();

      if (errors) {
        res.status(400).json({
          err: errors

        });
      } else {
        const token = req.headers['jwt-token'];
        jwt.verify(token, (decoded) => {
          if (decoded.type === 3) {
            const assessment = new Assessment({
              sp_id: decoded.id,
              user_id: req.params.id,
              rating: req.body.rating,
              field: req.body.field,
              offer_id: req.body.offer_id
            }).save((err, assessment) => {
              if (err) {
                res.status(500).json({
                  status: 'error',
                  message: err.message,
                });
              } else {
                //const is_assessed = true;
                Reservation.findOneAndUpdate({
                  offer_id: req.body.offer_id,
                  user_id: req.params.id
                }, {
                  $set: {
                    is_assessed: true,
                  },
                }, {
                  safe: true,
                  upsert: true,
                  new: true,
                }, (err, reservation) => {
                  res.status(200).json({
                    status: 'success',
                    data: { // Data can be null if, for example, delete request was sent
                      message: `Approved successfully ${reservation}`,
                    },
                  });
                });
                /*Reservation.update({
                    user_id: req.params.id,
                    offer_id: req.body.offer_id,
                    sp_id: decoded.id
                  }, {
                    is_assessed
                  }, (err, sp1) => {
                    if (err) {
                      res.status(500).json({
                        status: 'error',
                        message: err.message,
                      });
                    } else {
                      res.status(200).json({
                        obj: assessment,
                        });
                    }
                  }); */
              }
            });
          } else {
            res.status(500).json({
              err: 'unauthorized access',
            });
          }
        });
      }
    },
    getAllSPProfiles(req, res) { // viewing a summary of all SP profiles
      // const token = req.headers['jwt-token'];
      // jwt.verify(token, (decoded) => {
      const token = req.headers['jwt-token'];
      jwt.verify(token, (decoded) => {

        SP.find({}).populate('user_id').exec((err, users) => {
          if (err) {
            res.status(500).json({
              status: 'error',
              message: err.message,
            });
          } else {
            res.status(200).json({
              status: 'success',
              data: {
                message: 'summary of SP profiles retrieved successfully',
                users,
              },
            });
          }
          // });
        });

      });
    },

    getSPProfile(req, res) { // viewing a specific SP profile

      const query = {
        _id: req.params.id, // Recently Changed to Params
      };

      SP.findOne(query, (err, providerProfile) => {
        if (providerProfile != undefined)
          User.findOne({

            _id: providerProfile.user_id
          }, (err, user) => {

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
                  user,
                },
              });
            }
          });
      });
    },

    // method used to add a video to the database
    addVideoByURL(req, res) {
      // req.checkBody('title', 'Title is required').notEmpty();
      // req.checkBody('videoURL', 'A Video Url is required').notEmpty();
      //
      // var errors = req.validationErrors();
      //
      // if (errors) {
      //   res.status(400).json({
      //     err: errors
      //
      //   });
      //   //console.log(errors);
      // else {
      const token = req.headers['jwt-token'];
      jwt.verify(token, (decoded) => {
        if (decoded.type === 3) {
          const user_id = decoded.id;
          const title = req.body.title;
          var videoURLid = getYouTubeID(req.body.videoURL);

          const url = videoURLid; //changed it to work with front end
          // creating the new video instance in the database
          const newVideo = new Video({
            user_id,
            title,
            url,

          });
          newVideo.save((err, video) => {
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
            err: 'unauthorized access',
          });
        }
      });

    },

    // getting the embeded video object for the front end to embed it
    getVideo(req, res) {
      const query = {
        user_id: req.body.id, // Recently Changed to Params
      };

      Video.find((query), (err, video) => {
        if (err) {
          res.status(500).json({
            status: 'error',
            message: err.message,
          });
        } else {
          res.status(200).json({
            status: 'success',
            data: {
              video,
            },
          });
        }
      });
    },
    editSP(req, res) {


      const token = req.headers['jwt-token'];
      jwt.verify(token, (decoded) => {
        if (decoded.type === 3) {
          User.find({
            _id: decoded.id,
          }, (err, user) => {
            if (err) {
              res.status(500).json({
                status: 'error',
                message: err.message,
              });
            } else {
              SP.find({
                user_id: decoded.id,
              }, (err, sp) => {
                if (err) {
                  res.status(500).json({
                    status: 'error',
                    message: err.message,
                  });
                } else {
                  const price_category = req.body.price_category;
                  const location = req.body.location;
                  const description = req.body.description;
                  const fields = req.body.fields;
                  const phone_number = req.body.phone_number;

                  SP.update({
                    user_id: decoded.id,
                  }, {
                    price_category,
                    location: req.body.location,
                      description,
                      fields,
                      phone_number,
                      lat: req.body.lat,
                      lang: req.body.lang,
                  }, (err, sp1) => {
                    if (err) {
                      res.status(500).json({
                        status: 'error',
                        message: err.message,
                      });
                    } else {
                      res.json({
                        mssg: 'sp updated',
                      });
                    }
                  });
                }
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
    viewProfile(req, res) { // viewing my SP profile
      const token = req.headers['jwt-token'];
      jwt.verify(token, (decoded) => {
        if (decoded.type === 3) {
          const query = {
            user_id: decoded.id,
          };
          SP.findOne(query, (err, providerProfile) => {
            if (err) {
              res.status(500).json({
                status: 'error',
                message: err.message,
              });
            } else {
              User.find({
                _id: decoded.id
              }, (err, user) => {
                res.status(200).json({
                  status: 'success',
                  data: {
                    user,
                    providerProfile,
                  },
                });
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

    viewSPoffers(req, res) {
      const query = {
        sp_id: req.body.id,
      };
      Offer.find(query, (err, Offers) => {
        if (err) {
          res.status(500).json({
            status: 'error',
            message: err.message,
          });
        } else {
          res.status(200).json({
            status: 'success',
            data: {
              Offers,
            }
          })
        }
      });

    },
    editPassword(req, res) {
      //console.log('here');
      const token = req.headers['jwt-token'];
      jwt.verify(token, (decoded) => {
        //console.log(decoded)
        if (decoded.type === 3) {
          User.find({
            _id: req.body.id
          }, function(err, user) {
            //console.log(req.body.id);
            //console.log(user)
            if (err) {
              console.log(1)
              res.status(400).json({
                err: err.message

              });
            } else {
              //console.log(user[0].password);
              //console.log(req.body.oldPassword)
              //console.log(req.body.newPassword)
              //console.log(req.body.confirmNewPassword)

              req.checkBody('oldPassword',
                'Your old Password is required').notEmpty();
              req.checkBody('newPassword',
                'A new Password is required').notEmpty();
              req.checkBody('oldPassword', 'Wrong old Password').equals(
                user[0].password);
              req.checkBody('confirmNewPassword',
                "Passwords don't match").equals(req.body.newPassword)

              var errors = req.validationErrors();
              //  console.log(user)
              if (errors) {
                //  console.log('errors here');

                res.status(400).json({

                  err: errors

                });
              } else {
                User.findByIdAndUpdate(decoded.id, {
                  $set: {
                    password: req.body.newPassword,
                  },
                }, {
                  safe: true,
                  upsert: true,
                  new: true,
                }, (err, sP) => {
                  //console.log('modified!');
                  if (err) {
                    res.status(400).json({
                      err: err.message,
                    });
                  } else {
                    console.log('should modify');

                    res.status(200).json({
                      status: 'success',
                      data: {
                        message: `Edited Password correctly!`,
                      },
                    });
                  }
                });
              }
            }


          });


        } else {
          res.status(500).json({
            err: err.message,
          });
        }
      });
    },


    viewMyInterests(req, res) { // SPs interests
      const token = req.headers['jwt-token'];
      jwt.verify(token, (decoded) => {
        if (decoded.type === 3) {
          const interests = SP.find({
            user_id: decoded.id,
          }, (err, sp) => {
            if (err) {
              res.status(500).json({
                status: 'error',
                message: err.message,
              });
            } else {
              Interest.find({
                name: {
                  $in: sp.fields,
                },
              }, (err, interests) => {
                if (err) {
                  res.status(500).json({
                    status: 'error',
                    message: err.message,
                  });
                } else {
                  res.status(200).json({
                    status: 'success',
                    data: {
                      interests,
                    },
                  });
                }
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

};

module.exports = spController;
