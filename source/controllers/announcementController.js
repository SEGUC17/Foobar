const Announcement = require('../models/Announcement');
const jwt = require('../auth/jwt');


const announcementController = {

  getAllAnnouncements(req, res) { // viewing all announcements
      const token = req.headers['jwt-token'];
      if (token !== null) {
        jwt.verify(token, (decoded) => {
          Announcement.find({}).populate('announcer_id',{password:0}).exec((err,
            announcements) => {
            if (err) {
              res.status(500).json({
                status: 'error',
                message: err,
              });
            } else {
              announcements = announcements.reverse();
              res.status(200).json({
                status: 'success',
                data: {
                  announcements,
                },
              });
            }
          });
        });
      }
    },

};
module.exports = announcementController;
