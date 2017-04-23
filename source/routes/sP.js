const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');
const reservationController = require('../controllers/reservationController');
const offerController = require('../controllers/offerController');
const sPController = require('../controllers/sPController');
const studentController = require('../controllers/studentController');
const pendingSPController = require('../controllers/pendingSPController');
const Image = require('../models/Image');
const User = require('../models/User');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const storage = multer.diskStorage({ // specifying storage path for images
  destination: './public/uploads/',
  filename(req, file, cb) {
    crypto.pseudoRandomBytes(16, (err, raw) => {
      if (err) return cb(err);

      cb(null, raw.toString('hex') + path.extname(file.originalname));
    });
  },
});

const upload = multer({
  storage,
});

//routes for an SP user

router.get('/', function(req, res) { //SP home page
  // res.render('index');
  console.log('SP homepage is here');
});


router.post('/upload', upload.single('avatar'), (req, res) => {
  console.log(req.file);
  const image = new Image({
    user_id: req.body.user_id,
    title: '',
    caption: '',
  });

  image.img.name = req.file.filename;
  image.img.path = req.file.path;
  image.img.size = req.file.size;

  image.save((err) => {
    if (err) {
      console.log('error');
    } else {
      res.send("sucess");
    }
    console.log('success');
  });
});

router.post('/changedp', upload.single('avatar2'), (req, res) => {
  User.findById(req.body.user_id, function(error, user) {
    if (error)
      console.log(error)
    else {
      user.profileimg.name = req.file.filename;
      user.profileimg.path = req.file.path;
      user.profileimg.size = req.file.size;
      user.save((err) => {
        if (err) {
          console.log('error');
        } else {
          res.send("sucess");
        }
        console.log('success');
      });
    }
  })
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

router.get('/reviews/view', sPController.viewReviews);

// router.post('/images/upload', upload.single('image'), sPController.uploadImage); //adding an image to his profile

router.post('/videos/upload', sPController.addVideoByURL);

router.get('/images/:id', sPController.getImages);

router.post('/videos', sPController.getVideo); // adding an embedded video//adding an embedded video

router.post('/reservations/approve', studentController.approveReservation);

router.post('/sP/editpassword', sPController.editPassword); //editing password of a specific service provider


module.exports = router;
