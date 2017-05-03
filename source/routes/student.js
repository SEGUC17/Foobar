const express = require('express');

const router = express.Router();
const announcementController = require('../controllers/announcementController');
const reservationController = require('../controllers/reservationController');
const sPController = require('../controllers/sPController');
const studentController = require('../controllers/studentController');
const homeController = require('../controllers/homeController');
const interestController = require('../controllers/interestController');


// routes for a Student user

router.get('/', (req, res) => { // student home page
  // res.render('index');
  console.log('student homepage is here');
});

router.get('/interests/view', studentController.viewMyInterests);
router.get('/announcements/view', announcementController.getAllAnnouncements); // viewing announcements


router.post('/serviceproviders/offers', sPController.viewSPoffers); // student can add review for ServiceProvider

router.post('/serviceproviders/add/', studentController.addReview); // student can add review for ServiceProvider

router.get('/reservations/view', reservationController.getReservations); // viewing his reservations

router.get('/all/interests', interestController.findAllInterests);

router.get('/sP/:id', sPController.getSPProfile); // viewing a specific SP profile

router.get('/sPs/', sPController.getAllSPProfiles); // viewing a summary of all SP profiles

router.get('/student/:id', studentController.viewStudent); // Student could view his profile

router.post('/student/', studentController.editStudent); // Student could edit his profile

router.post('/offers/', studentController.applyOffer); // Student could apply for an offer

router.get('/viewoffer', homeController.viewOffers); // Student can view his offers

router.get('/viewalloffers', homeController.viewAllOffers); // Student can view all offers

router.get('/profile', homeController.findProfile); // msh3arf feen

router.post('/home', studentController.search); // Student can search offers

router.post('/searchSPs', studentController.searchSPs); // Student can search SPs


router.get('/progress', studentController.seeProgress); // student can see his progress
router.post('/reviews/view', studentController.viewReviews);

router.post('/comments/create', studentController.addComment); // adding a comment to a review

router.post('/student/editpassword', studentController.editPassword); //editing password of a specific student
module.exports = router;
