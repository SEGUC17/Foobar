let Announcement = require("../models/Announcement");


let announcementController = {

  getAllAnnouncements: function(req, res) { //viewing all announcements

    Announcement.find(function(err, announcements) {

      if (err) {
        res.json(err.message);

        console.log("error");
      } else {
        //Updated
        res.json(announcements);
        console.log('announcements retrieved successfully');
        // res.render('viewAnnouncements', {announcements:announcements});
      }
    });
  }


};
module.exports = announcementController;
