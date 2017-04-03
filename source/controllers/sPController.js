const SP = require('../models/ServiceProvider');
const Announcement = require('../models/Announcement');
const Review = require('../models/Review');
const Video = require("../models/Video");
const Reservation = require('../models/Reservation');
const Assessment = require('../models/Assessment');


const spController = {
  postAnnouncement: function(req, res) {
    // const announcement = new Announcement(req.body);
    const announcement = new Announcement();
    announcement.title = req.body.title;
    announcement.content = req.body.content;
    announcement.announcer_id = req.user.id;
    announcement.type = 'SPannouncement';

    announcement.save(function(err, announcement) {
      if (err) {
        res.send(err.message);
      } else {
        res.json("Ay Haga")
        console.log(announcement);
      }
    });
  },
  viewReviews: function(req, res) {
    const reviews = Review.find({
      sp_id: req.user.id
    }, function(err, reviews) {
      if (err) {
        res.send(err.message);
      } else {
        console.log(reviews);
      }
    });
  },
  assessStudent: function(req, res) {
    // req.params.id
    const assessment = new Assessment();
    assessment.sp_id = req.user.id;
    Reservation.find({
      service_provider_id: req.user.id,
      user_id: req.params.id,
    }, function(err, student) {
      if (err) {
        res.send(err.message);
      } else {
        assessment.user_id = req.params.id;
        assessment.sp_id = req.user.id;
        assessment.rating = req.body.rating;
        assessment.save(function(err, assessment) {
          if (err) {
            res.send(err.message);
          } else {
            console.log(assessment);
          }
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
        res.json(profiles);
        console.log('summary of SP profiles retrieved successfully');
      }
    });
  }, 

  getSPProfile: function(req, res) { //viewing a specific SP profile
    var query = {
      user_id: req.params.id //Recently Changed to Params 
    };

    SP.findOne(query, function(err, providerProfile) {
      if (err) console.log(err);

      console.log(req);
      res.json(providerProfile);
      // res.render('spProfile', {
      //   sPProfile: providerProfile
    
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
