  const express = require('express');
  const jwt = require('../auth/jwt');
  const User = require('../models/User');
  const homeController = require('../controllers/homeController');
  const Student = require('../models/Student');
  const studentController = require('../controllers/studentController');
  const StudentInterest = require('../models/StudentInterest');

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

  router.post('/login', (req, res) => {
    const token = jwt.generate({
      email: req.body.email,
      password: req.body.password,
    }, (token) => {
      if (!token) {
        res.status(401).json({
          message: 'Wrong Credentials',
        });
      } else {
        res.json({
          token,
        });
      }
    });
  });

  router.post('/signup', (req, res) => {

        console.log("ahmed");
      var email= req.body.email;
     var password= req.body.password;
     var name= req.body.name;
    
req.checkBody('name', 'Name is required').notEmpty();
        req.checkBody('email', 'Email is required').notEmpty();
        req.checkBody('username', 'Username is required').notEmpty();
        req.checkBody('password', 'Password is required').notEmpty();
        req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

        var errors = req.validationErrors();
        if(errors){
          res.status(400).json({
            errors

          });
        }
        else{


    
    console.log(req.body)
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      type: 2,
      is_deleted: false,
      is_blocked: false,
    });
    user.save((err) => {
      if (err) {
        return res.status(400).json({
          err: 'Email is already taken'
        });
      } else {


        const newStudent = new Student({
          user_id: user._id,
          university: req.body.university,
          address: req.body.address,
          birthdate: req.body.birthdate,
          description: req.body.description,
        });

        const interests = req.body.interests;
        console.log(user);
        if (interests) {
          for (let i = 0; i < interests.length; i += 1) {
            const newInterset = new StudentInterest({
              student_id: user._id,
              interest_id: interests[i],
            });
            newInterset.save((saveerr) => {
              if (saveerr) {
                res.json('Student interest saving error ');
              }
            });
          }
        }

        // do your updates here
        if (req.file) {
          user.profileimg.name = req.file.filename;
          user.profileimg.path = req.file.path;
          user.profileimg.size = req.file.size;
        }

        // save the user

        newStudent.save((saveerr2) => {
          if (saveerr2) {
            res.json(err);
          }
        });


        res.json({
          message: 'Signup success',
        });


      }
    
    });
    }
  });
  router.post('/resetPW', homeController.resetPassword); // viewing announcements
  router.post('/decode', homeController.getsignedvals); // decoding token from front end
  router.post('/comments/create', studentController.addComment); // adding a comment to a review


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
