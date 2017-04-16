let Offer = require('../models/Offer');
let Interest = require('../models/Interests');
let SI = require('../models/StudentInterest');
let Student = require('../models/Student');
let SP = require('../models/ServiceProvider');
let User = require('../models/User');
const generatePassword = require('password-generator'); // a dependency that generates random password
// 'use strict';
const nodemailer = require('nodemailer'); //a dependency that sends an email to user
const jwt = require('../auth/jwt');


let homeController = {
  findProfile: function(req, res) {
    const token = req.headers['jwt-token'];
    jwt.verify(token, function(decoded) {
      if (decoded.type == 1) {
        res.status(200).json({
          status: 'success',
          data: {
            message: 'Admin logged in',
          },
        });
      } else if (decoded.type == 2) {
        Student.find({
          user_id: decoded.id
        }, function(err, student) {
          if (err)
            res.status(500).json({
              status: 'error',
              message: err.message,
            });
          else {
            // Return
            res.status(200).json({
              message: 'Student logged in',
              student: student,
              name: decoded.name
            });
          }
        });
      } else if (decoded.type == 3) {
        SP.find({
          user_id: decoded.id
        }, function(err, sp) {
          if (err)
            res.status(500).json({
              status: 'error',
              message: err.message,
            });

          else {
            // Return
            res.status(200).json({
              status: 'success',
              data: {
                message: 'Service Provider logged in',
              },
            });
          }
        });
      } else {
        res.status(404).json({
          status: 'error',
          message: 'No user found',
        });
      }
    });
  },
  viewOffers: function(req, res) {
    const token = req.headers['jwt-token'];
    jwt.verify(token, function(decoded) {
      if (decoded.type == 2) {
        SI.find({
          student_id: decoded.id
        }, function(err, studentinterests) {
          if (err) {
            res.status(500).json({
              status: 'error',
              message: err.message,
            });
          } else {
            Interest.find({
              id: {
                $in: studentinterests.interest_id
              }
            }, function(err, interests) {

              if (err) {
                res.status(500).json({
                  status: 'error',
                  message: err.message,
                });
              } else {
                Offer.find({
                  field: {
                    $in: interests.name
                  }
                }, function(err, offers) {
                  if (err) {
                    res.status(500).json({
                      status: 'error',
                      message: err.message,
                    });
                  } else {
                    // Return
                    res.status(200).json({
                      status: 'success',
                      data: {
                        message: 'Viewing offers',
                        offers,
                      },
                    });
                  }
                });
              }
            });
          }
        });
      } else {
        Offer.find({}, {
          limit: 10
        }, function(err, offers) {
          if (err) {
            res.status(500).json({
              status: 'error',
              message: err.message,
            });
          } else {
            // Return
            res.status(200).json({
              offers: offers
            });
          }
        });
      }
    });


  },
  resetPassword: function(req, res) {
    var email = req.body.email;
    var password = generatePassword();
    //  console.log(password);
    User.findOne({
      email: email
    }, function(err, user) {
      // if there are any errors, return the error
      if (err)
        res.json(err);
      else //a user is found with the submitted email
      {
        User.findByIdAndUpdate(user.id, {
          $set: {
            password: password
          }
        }, {
          safe: true,
          upsert: true,
          new: true
        }, function(err, newUser) {
          res.json('Password resetted successfully to ' + password +
            ' , and an email was sent to the user with the new password.'
          );
          //  console.log(newUser);
        });
      }
    });
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'foobar.se@gmail.com',
        pass: 'foobar1234'
      }
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: ' "Foobar" <foobar.se@gmail.com>', // sender address
      to: email, // list of receivers
      subject: 'Password reset inquiry ✔', // Subject line
      text: 'Dear Sir/Madam, you have requested to reset your password for our system. You can now login using your email and password = ' +
        password // plain text body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
    });


  },
  getsignedvals: function(req, res) {


    const token = req.body.token;
    jwt.verify(token, function(decoded) {


      res.json(decoded);



    });
  }
};

module.exports = homeController;
