const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');
const reservationController = require('../controllers/reservationController');
const sPController = require('../controllers/sPController');
const studentController = require('../controllers/studentController');
const homeController = require('../controllers/homeController');


//routes for a Student user

router.get('/', function(req, res) { //student home page
  // res.render('index');
  console.log('student homepage is here');
});


router.get('/announcements/view', announcementController.getAllAnnouncements); //viewing announcements

router.post('/serviceproviders/add/:id', studentController.addReview); // student can add review for ServiceProvider

router.get('/reservations/view', reservationController.getReservations); //viewing his reservations

router.get('/sP/:id', sPController.getSPProfile); //viewing a specific SP profile

router.get('/sPs/', sPController.getAllSPProfiles); //viewing a summary of all SP profiles

router.get('/student/:id', studentController.viewStudent); // Student could view his profile

router.post('/student/', studentController.editStudent); // Student could edit his profile

router.post('/offers/:id', studentController.applyOffer); // Student could apply for an offer

router.get('/viewoffer', homeController.viewOffers); // Student can view offers

router.get('/profile', homeController.findProfile); // msh3arf feen

router.post('/home', studentController.search); // Student can search offers

router.get('/progress', studentController.seeProgress); //student can see his progress

router.post('/comments/create', studentController.addComment); //adding a comment to a review
module.exports = router;
