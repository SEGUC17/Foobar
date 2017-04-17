const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');
const reservationController = require('../controllers/reservationController');
const offerController = require('../controllers/offerController');
const sPController = require('../controllers/sPController');
const pendingSPController = require('../controllers/pendingSPController');
const multer = require('multer');
const crypto = require("crypto");
const storage = multer.diskStorage({ //specifying storage path for images
  destination: 'public/uploads/',
  filename: function(req, file, cb) {
    crypto.pseudoRandomBytes(16, function(err, raw) {
      if (err) return cb(err);

      cb(null, raw.toString('hex') + path.extname(file.originalname));
    });
  }
});

var upload = multer({
  storage: storage
});

//routes for an SP user

router.get('/', function(req, res) { //SP home page
  // res.render('index');
  console.log('SP homepage is here');
});

router.get('/announcements/view', announcementController.getAllAnnouncements); //viewing announcements

router.get('/profile/view', sPController.viewProfile); //SP viewing his profile

router.post('/announcements/post', sPController.postAnnouncement); //posting announcements

router.post('/profile/edit', sPController.editSP); //SP editing his profile

router.get('/reviews/view', sPController.viewReviews); //viewing reviews

router.get('/interests', sPController.viewInterests); //viewing all interests 

router.get('/sP/interests', sPController.viewMyInterests); //viewing SP's interests 

router.get('/students/offer', sPController.viewStudentsFinishedOffer); //viewing students who finished my offers

router.post('/students/assess/:id', sPController.assessStudent); // service provider assessing student

router.get('/reservations/view', reservationController.getReservations); //viewing his reservations

router.post('/offers/create', offerController.createOffer); //posting a new offer

router.post('/sP/apply', pendingSPController.Apply); // service provider can apply

// router.post('/images/upload', upload.single('image'), sPController.uploadImage); //adding an image to his profile

router.post('/videos/upload', sPController.addVideoByURL); //adding an embedded video

module.exports = router;
