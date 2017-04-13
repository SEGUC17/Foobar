const SP = require('../models/ServiceProvider');
const Announcement = require('../models/Announcement');
const Review = require('../models/Review');
const Video = require('../models/Video');
const Assessment = require('../models/Assessment');


const spController = {
  postAnnouncement(req, res) {
    const user = req.user;
    if (user && user.type === 3) {
      const announcement = new Announcement({
        title: req.body.title,
        content: req.body.content,
        announcer_id: user.id,
        type: 'SPannouncement',
      });
      announcement.save((err) => {
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
      res.status(403).json({
        status: 'error',
        message: 'Forbidden access',
      });
    }
  },
  viewReviews(req, res) {
    const user = req.user;
    if (user && user.type === 3) {
      Review.find({
        sp_id: user.id,
      }, (err, reviews) => {
        if (err) {
          res.status(500).json({
            status: 'error',
            message: err.message,
          });
        } else {
          res.status(200).json({
            status: 'success',
            data: {
              reviews,
            },
          });
        }
      });
    } else {
      res.status(403).json({
        status: 'error',
        message: 'Forbidden access',
      });
    }
  },
  assessStudent(req, res) {
    const user = req.user;
    const assessment = new Assessment({
      sp_id: user.id,
      user_id: req.params.id,
      rating: req.body.rating,
    });

    assessment.save((err) => {
      if (err) {
        res.status(500).json({
          status: 'error',
          message: err.message,
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
  getAllSPProfiles(req, res) { // viewing a summary of all SP profiles
    SP.find((err, profiles) => {
      if (err) {
        res.status(500).json({
          status: 'error',
          message: err.message,
        });
        return undefined;
      }
        // res.render('spProfiles', {profiles:profiles});
      res.status(200).json({
        status: 'success',
        data: {
          message: 'summary of SP profiles retrieved successfully',
          profiles,
        },
      });
      return undefined;
    });
  },

  getSPProfile(req, res) { // viewing a specific SP profile
    const query = {
      user_id: req.params.id, // Recently Changed to Params
    };

    SP.findOne(query, (err, providerProfile) => {
      if (err) {
        res.status(500).json({
          status: 'error',
          message: err.message,
        });
      }
      res.status(200).json({
        status: 'success',
        data: {
          providerProfile,
        },
      });
      // res.render('spProfile', {
      //   sPProfile: providerProfile
    });
  },
  // method used to add a video to the database
  addVideoByURL(req, res) {
    const user = req.user;
    // creating the new video instance in the database
    const newVideo = new Video({
      user_id: user.id,
      title: req.body.title,
      url: req.body.videoURL,

    });
    newVideo.save((err) => {
      if (err) {
        res.status(500).json({
          status: 'error',
          message: err,
        });
      } else {
        res.status(200).json({
          status: 'success',
          data: null,
        });
      }
    });
  },


  // getting the embeded video object for the front end to embed it
  getVideo(req, res) {
    // const id = req.params.id;
    // //var id = req.spid; //id that will be passed by the form as a hidden variable of the current sp
    // //getting the videos of the currently viewed service provider
    // getVideoById = function(id, out) {
    //   Video.findById(id, function(err, videos) {
    //     if (err)
    //       console.log(err);
    //     else {
    //       res.json(videos);
    //     }
    //   });
    // };
    // old method above new method below
    const query = {
      user_id: req.params.id, // Recently Changed to Params
    };

    Video.find(query, (err, video) => {
      if (err) {
        res.status(500).json({
          status: 'error',
          message: err.message,
        });
      }
      res.status(200).json({
        status: 'success',
        data: {
          video,
        },
      });
    });
  },
};

module.exports = spController;
