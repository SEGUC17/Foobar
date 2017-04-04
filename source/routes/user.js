var path = require('path');
var multer = require('multer');
var crypto = require("crypto");
// Image upload
var storage = multer.diskStorage({
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

module.exports = function(app, passport) {


  // =====================================
  // LOGIN ===============================
  // =====================================
  // show the login form
  app.get('/login', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('login.ejs', {
      message: req.flash('loginMessage'),
      pagetitle: "Login",
      user: req.user
    });
  });



  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  app.get('/signup', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('signup.ejs', {
      message: req.flash('signupMessage'),
      pagetitle: "Signup",
      user: req.user
    });
  });


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

  // app.post('/login', function(req, res, next) {
  //   passport.authenticate('local-login', function(err, user, info) {
  //     if (err) { res.send(err); }
  //     if (!user) { 
  //       res.send(info.message); 
  //     } else{
  //       res.send(user);
  //     }
  //   })(req, res, next);
  // });

 app.post('/login',
  passport.authenticate('local-login'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.send(req.user);
  });


  // app.post('/login',
  //   passport.authenticate('local-login'),
  //   function(req, res) {
  //     // If this function gets called, authentication was successful.
  //     // `req.user` contains the authenticated user.
  //     res.send(req.user);
  //     // res.redirect('/profile');
  //   });

  // =====================================
  // FACEBOOK ROUTES =====================
  // =====================================
  // route for facebook authentication and login
  app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: 'email'
  }));

  // handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/profile',
      failureRedirect: '/'
    }));



  // =====================================
  // PROFILE SECTION =====================
  // =====================================

  // LOGOUT ==============================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();
  // if they aren't redirect them to the home page
  res.redirect('/');
}
