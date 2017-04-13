// Requiremenets
const announcementController = require('../source/controllers/announcementController');
const pendingSPController = require('../source/controllers/pendingSPController');
const adminController = require('../source/controllers/adminController');
const reviewController = require('../source/controllers/reviewController');
const sPController = require('../source/controllers/sPController');
const interestController = require('../source/controllers/interestController');
const reservationController = require('../source/controllers/reservationController');
const offerController = require('../source/controllers/offerController');
const studentController = require('../source/controllers/studentController');
const homeController = require('../source/controllers/homeController');


const path = require('path');
const multer = require('multer');
const crypto = require('crypto');

// For Uploading Pictures
const storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename(req, file, cb) {
    crypto.pseudoRandomBytes(16, (err, raw) => {
      if (err) {
        return cb(err);
      }
      cb(null, raw.toString('hex') + path.extname(file.originalname));
      return undefined;
    });
  },
});

const upload = multer({
  storage,
});

// will be added to all the functions that require login when it we are not using postman
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }
  // if they aren't redirect them to the home page
  res.status(403).json({
    status: 'error',
    message: 'You must be logged in to access this resource',
  });
  return undefined;
}


module.exports = function (app, passport) {
  // =====================================
  // LOGIN ===============================
  // =====================================

  // show the login form
  app.get('/login', (req, res) => {
    // render the page and pass in any flash data if it exists
    res.render('login.ejs', {
      message: req.flash('loginMessage'),
      pagetitle: 'Login',
      user: req.user,
    });
  });

  // show the signup form
  app.get('/signup', (req, res) => {
    // render the page and pass in any flash data if it exists
    res.render('signup.ejs', {
      message: req.flash('signupMessage'),
      pagetitle: 'Signup',
      user: req.user,
    });
  });

  // process the signup form
  app.post('/signup', (req, res, next) => {
    passport.authenticate('local-signup', (err, user, info) => {
      if (err) {
        res.status(500).json({
          status: 'error',
          message: err.message,
        });
      }
      if (!user) {
        res.status(500).json({
          status: 'error',
          message: info.message,
        });
      } else {
        res.status(200).json({
          status: 'success',
          data: {
            message: 'Signup was successful',
          },
        });
      }
    })(req, res, next);
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login'), (req, res) => {
    res.status(200).json({
      status: 'success',
      data: {
        message: 'Login success',
      },
    });
  });

  // destroy user session
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.post('/resetPassword', homeController.resetPassword);

  // ADMIN FUNCTIONS

  app.get('/admin/announcements/view', isLoggedIn, announcementController.getAllAnnouncements); // viewing announcements

  app.get('/admin/pendingSPRequests/', isLoggedIn, pendingSPController.getAllPendingSP); // viewing pending sp requests

  app.post('/admin/pendingSPRequests', isLoggedIn, adminController.approveOrDisapproveSP); // approving/disapproving pending sp requests

  app.get('/admin/sP/:id', isLoggedIn, sPController.getSPProfile); // view a specific SP profile

  app.get('/admin/sPs/', isLoggedIn, sPController.getAllSPProfiles); // viewing all SP profiles

  app.post('/admin/sP/:id/reviews', isLoggedIn, reviewController.deleteReview); // deleting a review

  app.post('/admin/addInterest', isLoggedIn, interestController.addInterest); // adding an interest option

  app.post('/admin/', isLoggedIn, adminController.addAdmin); // admin can add another admin

  app.delete('/admin/students/:id', isLoggedIn, adminController.deleteStudent); // admin can delete a student

  app.delete('/admin/sp/:id', isLoggedIn, adminController.deleteSP); // admin can delete serviceprovider

  app.get('/admin/reviewdata', isLoggedIn, adminController.reviewDataAnalysis); // review data analysis

  app.post('/admin/adminAnnouncement', isLoggedIn, adminController.adminPostAnnouncement); // admin can post announcements

  // Service Provider

  app.get('/sp', isLoggedIn, (req, res) => { // SP home page
    // res.render('index');
    res.json('SP homepage is here');
  });

  app.get('/sp/announcements/view', isLoggedIn, announcementController.getAllAnnouncements); // viewing announcements

  app.post('/sp/announcements/post', isLoggedIn, sPController.postAnnouncement); // posting announcements

  app.get('/sp/reviews/view', isLoggedIn, sPController.viewReviews); // viewing reviews

  app.post('/sp/students/assess/:id', isLoggedIn, sPController.assessStudent); // service provider assessing student

  app.get('/sp/reservations/view', isLoggedIn, reservationController.getReservations); // viewing his reservations

  app.post('/sp/offers/create', isLoggedIn, offerController.createOffer); // posting a new offer

  // app.post('/images/upload', upload.single('image'), sPController.uploadImage);
  // adding an image to his profile

  app.post('/sp/videos/upload', isLoggedIn, sPController.addVideoByURL);


  // Student

  app.get('/student/profile', isLoggedIn, homeController.findProfile);

  app.get('/student/announcements/view', isLoggedIn, announcementController.getAllAnnouncements); // viewing announcements

  app.post('/student/serviceproviders/add/:id', isLoggedIn, studentController.addReview); // student can add review for ServiceProvider

  app.get('/student/reservations/view', isLoggedIn, reservationController.getReservations); // viewing his reservations

  app.get('/sP/:id', isLoggedIn, sPController.getSPProfile); // viewing a specific SP profile
  // this will be handled in the frontend so we can embed the videos
  app.get('/sP/videos/:id', isLoggedIn, sPController.getVideo); // viewing the video of a specific sp


  app.get('/sPs/', isLoggedIn, sPController.getAllSPProfiles); // viewing a summary of all SP profiles

  app.get('/student/:id', isLoggedIn, studentController.viewStudent); // Student could view his profile

  app.post('/student/:id', isLoggedIn, studentController.editStudent); // Student could edit his profile

  app.post('/student/offers/:id', isLoggedIn, studentController.applyOffer); // Student could apply for an offer

  app.get('/student', homeController.viewOffers); // Student can view offers

  app.post('/sP/apply', isLoggedIn, pendingSPController.Apply); // service provider can apply
};

