const SP = require('../models/ServiceProvider');
const Announcement = require('../models/Announcement');
const Review = require('../models/Review');
const Video = require('../models/Video');
const Reservation = require('../models/Reservation');
const Assessment = require('../models/Assessment');
const jwt = require('../auth/jwt');

const spController = {
  postAnnouncement: function(req, res) {
    const token = req.headers['jwt-token'];
    jwt.verify(token, function(decoded) {
      if (decoded.type == 3) {
        let announcement = new Announcement({
          title: req.body.title,
          announcer_id: decoded.id,
          content: req.body.content,
          type: 'ServiceProvider',
        }).save(function(err, announcement) {
          if (err) {
            res.json({
              err: 'error',
            });
          } else {
            console.log(announcement);
          }
        });
      } else {
        res.json({
          err: 'not authorized',
        });
      }
    });
  },
  viewReviews: function(req, res) {
    const token = req.headers['jwt-token'];
    jwt.verify(token, function(decoded) {
      if (decoded.type == 3) {
        const reviews = Review.find({
          sp_id: decoded.id,
        }, function(err, reviews) {
          if (err) {
            res.send(err.message);
          } else {
            console.log(reviews);
          }
        });
      } else {
        res.json({
          err: 'not authorized',
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
            res.json({
              err: 'error',
            });
          } else {
            console.log(assessment);
          }
        });
      } else {
        res.json({
          err: 'not authorized',
        });
      }
    });
  },
  getAllSPProfiles: function(req, res) { //viewing a summary of all SP profiles
    SP.find(function(err, profiles) {

      if (err) {
        res.send(err.message);
      } else {
        //res.render('spProfiles', {profiles:profiles});
        console.log(
          'summary of SP profiles retrieved successfully');
      }
    });
  },

  getSPProfile: function(req, res) { //viewing a specific SP profile
    var query = {
      user_id: req.body.id
    };

    SP.findOne(query, function(err, providerProfile) {
      if (err) console.log(err);

      console.log(req);

      res.render('spProfile', {
        sPProfile: providerProfile
      });
    });
  },
  //method used to add a video to the database
  addVideoByURL: function(req, res) {
    var user_id = req.user.id;
    var title = req.body.title;
    var url = req.body.videoURL;
    //creating the new video instance in the database
    var newVideo = new Video({
      user_id: user_id,
      title: title,
      url: url

    });
    newVideo.save();

  },
  //getting the embeded video
  getVideo: function(req, res) {

    var id = req.spid; //id that will be passed by the form as a hidden variable of the current sp
    //getting the videos of the currently signed in service provider
    getVideoById = function(id, out) {
      Video.findById(id, function(err, videos) {
        if (err)
          console.log(err);
        else {
          res.json(videos);
        }
      });
    };
  }
};

module.exports = spController;
