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

var path = require('path');
var multer  = require('multer');
var crypto = require("crypto");

// For Uploading Pictures
var storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)

      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
})

var upload = multer({ storage: storage });

module.exports = function(app, passport) {

    // =====================================
    // LOGIN ===============================
    // =====================================

    // show the login form
    app.get('/login', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage'), pagetitle: "Login", user : req.user }); 
    });

    // show the signup form
    app.get('/signup', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage'), pagetitle: "Signup", user : req.user });
    });

    //process the signup form
    app.post('/signup', function(req, res, next) {
        passport.authenticate('local-signup', function(err, user, info) {
          if (err) { res.send(err); }
          if (!user) { 
            res.send(info.message); 
          }else{
            res.send("Signup was successful!");
          }
        })(req, res, next);
      });

    //process the login form
    app.post('/login', passport.authenticate('local-login'), function(req, res) {
      // If this function gets called, authentication was successful.
      // `req.user` contains the authenticated user.
      res.send(req.user);
    });

    //destroy user session
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


  //ADMIN FUNCTIONS

  app.get('/admin/announcements/view', announcementController.getAllAnnouncements); // viewing announcements

  app.get('/admin/pendingSPRequests/', pendingSPController.getAllPendingSP); // viewing pending sp requests

  app.post('/admin/pendingSPRequests', adminController.approveOrDisapproveSP); // approving/disapproving pending sp requests

  app.get('/admin/sP/:id', sPController.getSPProfile); // view a specific SP profile

  app.get('/admin/sPs/', sPController.getAllSPProfiles); // viewing all SP profiles

  app.post('/admin/sP/:id/reviews', reviewController.deleteReview); // deleting a review

  app.post('/admin/addInterest', interestController.addInterest); // adding an interest option

  app.post('/admin/admin', adminController.addAdmin); // admin can add another admin

  app.delete('/admin/admin/students/:id', adminController.deleteStudent); // admin can delete a student

  app.delete('/admin/admin/sp/:id', adminController.deleteSP); // admin can delete serviceprovider

// Service Provider

  app.get('/sp', function(req, res) { //SP home page
    // res.render('index');
    res.send('SP homepage is here');
  });

  app.get('/sp/announcements/view', announcementController.getAllAnnouncements); //viewing announcements

  app.post('/sp/announcements/post', sPController.postAnnouncement); //posting announcements

  app.get('/sp/reviews/view', sPController.viewReviews); //viewing reviews

  app.post('/sp/students/assess/:id', sPController.assessStudent); // service provider assessing student

  app.get('/sp/reservations/view', reservationController.getReservations); //viewing his reservations

  app.post('/sp/offers/create', offerController.createOffer); //posting a new offer

// app.post('/images/upload', upload.single('image'), sPController.uploadImage); //adding an image to his profile

  app.post('/sp/videos/upload', sPController.addVideoByURL);

//Student

  app.get('/student/profile', homeController.findProfile);

  app.get('/announcements/view', announcementController.getAllAnnouncements); //viewing announcements

  app.post('/serviceproviders/add/:id', studentController.addReview); // student can add review for ServiceProvider

  app.get('/reservations/view', reservationController.getReservations); //viewing his reservations

  app.get('/sP/:id', sPController.getSPProfile); //viewing a specific SP profile

  app.get('/sPs/', sPController.getAllSPProfiles); //viewing a summary of all SP profiles

  app.get('/student/:id', studentController.viewStudent); // Student could view his profile

  app.post('/student/:id', studentController.editStudent); // Student could edit his profile

  app.post('/offers/:id', studentController.applyOffer); // Student could apply for an offer

  app.get('/student', homeController.viewOffers); // Student can view offers


};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}