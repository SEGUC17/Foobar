  const express = require('express');
  const jwt = require('../auth/jwt');
  const User = require('../models/User');
  const homeController = require('../controllers/homeController');
  const Student = require('../models/Student');
  const interests = require('../models/Interests');

  const router = express.Router();

  // var path = require('path');
  // var multer = require('multer');
  // var crypto = require("crypto");
  // var storage = multer.diskStorage({
  //   destination: 'public/uploads/',
  //   filename: function(req, file, cb) {
  //     crypto.pseudoRandomBytes(16, function(err, raw) {
  //       if (err) return cb(err);
  //
  //       cb(null, raw.toString('hex') + path.extname(file.originalname));
  //     });
  //   }
  // });
  //
  // var upload = multer({
  //   storage: storage
  // });

  router.post('/login', function(req, res) {
    const token = jwt.generate({
      email: req.body.email,
      password: req.body.password,
    }, function(token) {
      if (!token) {
        res.status(404).json({
          error: 'Credentials not found',
        });
      } else {
        res.json({
          token,
        });
      }
    });
  });

  router.post('/signup', function(req, res) {



    let user = new User({
      email: req.body.email,
      password: req.body.password,
      type: 2,
      is_deleted: false,
    }).save(function(err, user) {
      if (err) {
        res.json({
          err: 'error',
        });
      } else {

        var newStudent = new Student();
        newStudent.user_id = user.id;
        newStudent.university = req.body.university;
        newStudent.address = req.body.address;
        newStudent.birthdate = req.body.birthdate;
        newStudent.description = req.body.description;
        newStudent.is_deleted = false;

        const interests = req.body.interests;

        if (interests) {
          for (var i = 0; i < interests.length; i++) {
            var newInterset = new StudentInterest({
              student_id: user.id,
              interest_id: interests[i]
            });
          }

          newInterset.save(function(err) {
            if (err)
              res.json("Student interest saving error ");
          })
        };

        // do your updates here
        if (req.file) {
          newUser.profileimg.name = req.file.filename;
          newUser.profileimg.path = req.file.path;
          newUser.profileimg.size = req.file.size;
        }

        // save the user

        newStudent.save(function(err) {
          if (err)
            res.json(err);
        });



        res.json({
          user: "signup successfully"
        });
      }
    });



  });
  router.post('/resetPW', homeController.resetPassword); //viewing announcements

  // module.exports = function() {


  // =====================================
  // LOGIN ===============================
  // =====================================
  // show the login form
  // app.get('/', homeController.getAllStudents);
  // app.post('/profile', upload.single('work_img') , profileController.createWork);
  //
  // app.post('/changedp', upload.single('profile_img'), profileController.changedp);
  //
  //
  // app.get('/portfolio/:id', portfolioController.getAllWorks);

  // process the login form
  // app.post('/login', do all our passport stuff here);

  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  //   app.get('/signup', function(req, res) {
  //     // render the page and pass in any flash data if it exists
  //     res.render('signup.ejs', {
  //       message: req.flash('signupMessage'),
  //       pagetitle: "Signup",
  //       user: req.user
  //     });
  //   });
  //
  //   //process the signup form
  //   app.post('/signup', passport.authenticate('local-signup', {
  //     successRedirect: '/profile', // redirect to the secure profile section
  //     failureRedirect: '/signup', // redirect back to the signup page if there is an error
  //     failureFlash: true // allow flash messages
  //   }));
  //
  //   app.post('/login', passport.authenticate('local-login', {
  //     successRedirect: '/profile', // redirect to the secure profile section
  //     failureRedirect: '/login', // redirect back to the signup page if there is an error
  //     failureFlash: true // allow flash messages
  //   }));
  //
  //   // =====================================
  //   // FACEBOOK ROUTES =====================
  //   // =====================================
  //   // route for facebook authentication and login
  //   app.get('/auth/facebook', passport.authenticate('facebook', {
  //     scope: 'email'
  //   }));
  //
  //   // handle the callback after facebook has authenticated the user
  //   app.get('/auth/facebook/callback',
  //     passport.authenticate('facebook', {
  //       successRedirect: '/profile',
  //       failureRedirect: '/'
  //     }));
  //
  //   // process the signup form
  //   // app.post('/signup', do all our passport stuff here);
  //
  //   // =====================================
  //   // PROFILE SECTION =====================
  //   // =====================================
  //   // we will want this protected so you have to be logged in to visit
  //   // we will use route middleware to verify this (the isLoggedIn function)
  //   // app.get('/profile', isLoggedIn, profileController.getAllWorks)
  //
  //   // =====================================
  //   // LOGOUT ==============================
  //   // =====================================
  //   app.get('/logout', function(req, res) {
  //     req.logout();
  //     res.redirect('/');
  //   });
  // };
  //
  // // route middleware to make sure a user is logged in
  // function isLoggedIn(req, res, next) {
  //
  //   // if user is authenticated in the session, carry on
  //   if (req.isAuthenticated())
  //     return next();
  //   // if they aren't redirect them to the home page
  //   res.redirect('/');
  // };

  module.exports = router;
