const Announcement = require('../models/Announcement');

const announcementController = {
  getAllAnnouncements(req, res) { // viewing all announcements
    Announcement.find((err, announcements) => {
      if (err) {
        res.status(500).json({
          status: 'error',
          message: err,
        });
        return undefined; // Return breaks the function
      }
      // Else part
      res.status(200).json({
        status: 'success',
        data: {
          announcements,
        },
      });
      return undefined;
    });
  },


};
module.exports = announcementController;
