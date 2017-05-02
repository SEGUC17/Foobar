  const express = require('express');
  const jwt = require('../auth/jwt');
  const User = require('../models/User');
  const homeController = require('../controllers/homeController');
  const Student = require('../models/Student');
  const studentController = require('../controllers/studentController');
  const StudentInterest = require('../models/StudentInterest');
  const sPController = require('../controllers/sPController');

  const generatePassword = require('password-generator'); // a dependency that generates random password
  const nodemailer = require('nodemailer'); // a dependency that sends an email to use
  const router = express.Router();



  router.post('/login', (req, res) => {
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();

    const errors = req.validationErrors();

    if (errors) {
      res.status(400).json({
        err: errors,
      });
    } else {
      const token = jwt.generate({
        email: req.body.email,
        password: req.body.password,
      }, (token) => {
        if (!token) {
          res.status(401).json({
            err: 'Wrong Credentials',
          });
        } else {
          jwt.verify(token, function(decoded) {
            if (decoded.is_deleted === true) {
              res.status(500).json({
                err: 'User not found',
              });
            } else {
              res.json({
                token
              });
            }
          });

        }
      });
    }
  });

  router.post('/signup', (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const university = req.body.university;

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Must be a valid Email').isEmail();
    req.checkBody('university', 'university is required').notEmpty();
    req.checkBody('name',
      'Invalid Characters Used in name field! Only letters, spaces and numbers are allowed!'
    ).matches("^[a-zA-Z0-9- ]+$");
    req.checkBody('university',
      'Invalid Characters Used in university field! Only letters, spaces and numbers are allowed!'
    ).matches("^[a-zA-Z0-9- ]+$");

    req.checkBody('address',
      'Invalid Characters Used in address field! Only letters, spaces, numbers and commas are allowed!'
    ).matches("^[a-zA-Z0-9- -,]+$");
    const errors = req.validationErrors();
    if (errors) {
      res.status(400).json({
        err: errors,

      });
    } else {
      const password = generatePassword();

      const user = new User({
        email: req.body.email,
        password: password,
        name: req.body.name,
        type: 2,
        is_deleted: false,
        is_blocked: false,
      });
      user.save((err) => {
        if (err) {
          return res.status(400).json({
            err: [{
              msg: 'Email is already taken'
            }],
          });
        }


        const newStudent = new Student({
          user_id: user._id,
          university: req.body.university,
          address: req.body.address,
          birthdate: req.body.birthdate,
          description: req.body.description,

        });



        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'foobar.se@gmail.com',
            pass: 'foobar1234',
          },
        });

        // setup email data with unicode symbols
        const mailOptions = {
          from: ' "Foobar" <foobar.se@gmail.com>', // sender address
          to: email, // list of receivers
          subject: 'System Approval ✔', // Subject line
          text: `Congratulations! You have been approved for our system and now you can login using your email and password:${
    password}`, // plain text body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            res.status(500).json({
              status: 'error',
              message: err,
            });
          }
          //console.log('Message %s sent: %s', info.messageId,
          //  info.response);
        });

        const interests = req.body.interests;
        //console.log(user);
        if (interests) {
          //console.log(interests);
          for (let i = 0; i < interests.length; i += 1) {
            const newInterset = new StudentInterest({
              student_id: user._id,
              interest_id: interests[i]._id,
            });
            newInterset.save((saveerr) => {
              if (saveerr) {
                return res.status(400).json({
                  err: [{
                    msg: 'Student Interest saving error'
                  }],
                });
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
      });
    }
  });
  router.post('/resetPW', homeController.resetPassword);
  router.post('/decode', homeController.getsignedvals); // decoding token from front end
  router.post('/comments/view', sPController.viewComments); // viewing comments of a specific review
  router.post('/comments/create', studentController.addComment); // adding a comment to a review


  module.exports = router;