let ServiceProvider = require('../models/ServiceProvider');
let Announcement = require('../models/Announcement');
let Review = require('../models/Review');

let SPController = {
  post_announcement: function(req, res) {
    announcement = new Announcement(req.body);
    announcement.announcer_id = req.user.id;
    announcement.type = 'SPannouncement';

    announcement.save(function(err, announcement) {
      if (err)
        res.send(err.message);
      else {
        console.log(announcement)
        return 1;
      }
    })
  },
  view_reviews: function(req, res) {
    let reviews = Review.find({
      sp_id: req.user.id
    }, function(err, reviews) {
      if (err)
        res.send(err.message);
      else {
        console.log(reviews);
      }
    })

  },
  apply_to_join_system: function(req, res) {

  }
}

module.exports = SPController;
