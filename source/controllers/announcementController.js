let Announcement = require("../models/Announcement");
const jwt = require('../auth/jwt');


let announcementController = {

  getAllAnnouncements: function(req, res) { //viewing all announcements
    const token = req.headers['jwt-token'];
    jwt.verify(token, function(decoded) {
      Announcement.find(function(err, announcements) {

        if (err) {

          res.status(500).json({
            status: 'error',
            message: err,
          });
        } else {
          res.status(200).json({
            status: 'success',
            data: {
              announcements,
            },
          });
          // res.render('viewAnnouncements', {announcements:announcements});
        }
      });
    });
  }


};
module.exports = announcementController;
