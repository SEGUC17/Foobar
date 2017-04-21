const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');
const pendingSPController = require('../controllers/pendingSPController');
const adminController = require('../controllers/adminController');
const reviewController = require('../controllers/reviewController');
const sPController = require('../controllers/sPController');
const interestController = require('../controllers/interestController');

// routes for admin user


// router.get('/', function(req, res) { //admin home page
//   // res.render('index');
//   console.log('admin homepage is here');
// });

router.get('/pendingSPRequests/', pendingSPController.getAllPendingSP); // viewing pending sp requests

router.post('/pendingSPRequests', adminController.approveOrDisapproveSP); // approving/disapproving pending sp requests

router.get('/sP/:id', sPController.getSPProfile); // view a specific SP profile

router.get('/sPs/', sPController.getAllSPProfiles); // viewing all SP profiles

router.post('/sP/:id/reviews', reviewController.deleteReview); // deleting a review

router.post('/addInterest', interestController.addInterest); // adding an interest option

router.post('/admin', adminController.addAdmin); // admin can add another admin

router.post('/announcements/post', adminController.adminPostAnnouncement); // deleting a review

router.delete('/admin/students/:id', adminController.deleteStudent); // admin can delete a student

router.delete('/admin/sp/:id', adminController.deleteSP); // admin can delete serviceprovider

router.get('/reviewData', adminController.reviewDataAnalysis);

router.get('/admins', adminController.getAllAdmins); // admin can get all admins


router.get('/reviewinterest', adminController.reviewDataAnalysis);

router.post('/adminpost', adminController.adminPostAnnouncement); // admin can post announcements


router.post('/deletes', adminController.deleteS);

router.get('/viewstudents', adminController.getAllStudents);

router.post('/block', adminController.blockSP);

router.post('/blocks', adminController.blockS);


module.exports = router;
