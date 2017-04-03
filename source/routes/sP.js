const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');
const reservationController = require('../controllers/reservationController');
const offerController = require('../controllers/offerController');
const sPController = require('../controllers/sPController');
const multer = require('multer');
const crypto = require("crypto");

//using multer to upload images to sp profile
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

router.post('/announcements/post', sPController.postAnnouncement); //posting announcements

router.get('/reviews/view', sPController.viewReviews); //viewing reviews

router.post('/students/assess/:id', sPController.assessStudent); // service provider assessing student

router.get('/reservations/view', reservationController.getReservations); //viewing his reservations

router.post('/offers/create', offerController.createOffer); //posting a new offer

// router.post('/images/upload', upload.single('image'), sPController.uploadImage); //adding an image to his profile

router.post('/videos/upload', sPController.addVideoByURL); //adding an embedded video

module.exports = router;
