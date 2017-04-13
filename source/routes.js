// Requiremenets
const announcementController = require(
  '../source/controllers/announcementController');
const pendingSPController = require('../source/controllers/pendingSPController');
const adminController = require('../source/controllers/adminController');
const reviewController = require('../source/controllers/reviewController');
const sPController = require('../source/controllers/sPController');
const interestController = require('../source/controllers/interestController');
const reservationController = require(
  '../source/controllers/reservationController');
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

function adminLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    console.log('admin authed');
    if (req.user.type === 1) {
      return next();
    }
    res.status(403).json({
      status: 'error',
      message: 'You must be a logged in admin to access this resource',
    });
  }
  // if they aren't redirect them to the home page
  res.status(403).json({
    status: 'error',
    message: 'You must be a logged in admin to access this resource',
  });
  res.redirect('/');
}

// will be added to all the functions that require login when it we are not using postman
// route middleware to make sure a user is logged in
function studentLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    console.log('student authed');
    console.log(req.user.type);
    if (req.user.type === 2) {
      return next();
    }
    res.status(403).json({
      status: 'error',
      message: 'You must be a logged in student to access this resource',
    });
    return undefined;
  }
  // if they aren't redirect them to the home page
  res.status(403).json({
    status: 'error',
    message: 'You must be a logged in student to access this resource',
  });
}

function spLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    if (req.user.type === 3) {
      return next();
    }
    res.status(403).json({
      status: 'error',
      message: 'You must be a logged in service provider to access this resource',
    });
  }
  // if they aren't redirect them to the home page
  res.status(403).json({
    status: 'error',
    message: 'You must be a logged in service provider to access this resource',
  });
}


module.exports = function(app, passport) {
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

  app.get('/admin/announcements/view', announcementController.getAllAnnouncements); // viewing announcements

  app.get('/admin/pendingSPRequests/', adminLoggedIn, pendingSPController.getAllPendingSP); // viewing pending sp requests

  app.post('/admin/pendingSPRequests', adminLoggedIn, adminController.approveOrDisapproveSP); // approving/disapproving pending sp requests

  app.get('/admin/sP/:id', adminLoggedIn, sPController.getSPProfile); // view a specific SP profile

  app.get('/admin/sPs/', adminLoggedIn, sPController.getAllSPProfiles); // viewing all SP profiles

  app.post('/admin/sP/:id/reviews', adminLoggedIn, reviewController.deleteReview); // deleting a review

  app.post('/admin/addInterest', adminLoggedIn, interestController.addInterest); // adding an interest option

  app.post('/admin/', adminLoggedIn, adminController.addAdmin); // admin can add another admin

  app.delete('/admin/students/:id', adminLoggedIn, adminController.deleteStudent); // admin can delete a student

  app.delete('/admin/sp/:id', adminLoggedIn, adminController.deleteSP); // admin can delete serviceprovider

  app.get('/admin/reviewdata', adminLoggedIn, adminController.reviewDataAnalysis); // review data analysis

  app.post('/admin/adminAnnouncement', adminLoggedIn, adminController.adminPostAnnouncement); // admin can post announcements

  // Service Provider

  app.get('/sp', spLoggedIn, (req, res) => { // SP home page
    // res.render('index');
    res.json('SP homepage is here');
  });

  app.get('/sp/announcements/view', spLoggedIn, announcementController.getAllAnnouncements); // viewing announcements

  app.post('/sp/announcements/post', spLoggedIn, sPController.postAnnouncement); // posting announcements

  app.get('/sp/reviews/view', spLoggedIn, sPController.viewReviews); // viewing reviews

  app.post('/sp/students/assess/:id', spLoggedIn, sPController.assessStudent); // service provider assessing student

  app.get('/sp/reservations/view', spLoggedIn, reservationController.getReservations); // viewing his reservations

  app.post('/sp/offers/create', spLoggedIn, offerController.createOffer); // posting a new offer

  // app.post('/images/upload', upload.single('image'), sPController.uploadImage);
  // adding an image to his profile

  app.post('/sp/videos/upload', spLoggedIn, sPController.addVideoByURL);


  // Student

  app.get('/student/profile', studentLoggedIn, homeController.findProfile);

  app.get('/student/announcements/view', studentLoggedIn,
    announcementController.getAllAnnouncements); // viewing announcements

  app.post('/student/serviceproviders/add/:id', studentLoggedIn,
    studentController.addReview); // student can add review for ServiceProvider

  app.get('/student/reservations/view', studentLoggedIn,
    reservationController.getReservations); // viewing his reservations

  app.get('/sP/:id', studentLoggedIn, sPController.getSPProfile); // viewing a specific SP profile
  // this will be handled in the frontend so we can embed the videos
  app.get('/sP/videos/:id', studentLoggedIn, sPController.getVideo); // viewing the video of a specific sp


  app.get('/sPs/', studentLoggedIn, sPController.getAllSPProfiles); // viewing a summary of all SP profiles

  app.get('/student/:id', studentLoggedIn, studentController.viewStudent); // Student could view his profile

  app.post('/student/:id', studentLoggedIn, studentController.editStudent); // Student could edit his profile

  app.post('/student/offers/:id', studentLoggedIn, studentController.applyOffer); // Student could apply for an offer

  app.get('/student', studentLoggedIn, homeController.viewOffers); // Student can view offers

  app.post('/sP/apply', studentLoggedIn, pendingSPController.Apply); // service provider can apply
};
