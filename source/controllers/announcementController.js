let Announcement = require("../models/Announcement");


let announcementController = {

  getAllAnnouncements: function(req, res) { //viewing all announcements

    Announcement.find(function(err, announcements) {

      if (err) {
        res.send(err.message);

        console.log("error");
      } else {
        console.log('announcements retrieved successfully');
        // res.render('viewAnnouncements', {announcements:announcements});
      }
    });
  }


};
module.exports = announcementController;
