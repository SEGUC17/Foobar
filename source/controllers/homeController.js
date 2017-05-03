const Offer = require('../models/Offer');
const Interest = require('../models/Interests');
const SI = require('../models/StudentInterest');
const Student = require('../models/Student');
const SP = require('../models/ServiceProvider');
const User = require('../models/User');
const generatePassword = require('password-generator'); // a dependency that generates random password
// 'use strict';
const nodemailer = require('nodemailer'); // a dependency that sends an email to user
const jwt = require('../auth/jwt');
var _ = require('underscore');


const homeController = {
  findProfile(req, res) {
      var token = req.headers['jwt-token'];
      jwt.verify(token, (decoded) => {
        if (decoded.type === 1) {
          res.status(200).json({
            status: 'success',
            data: {
              message: 'Admin logged in',
            },
          });
        } else if (decoded.type === 2) {
          Student.find({
            user_id: decoded.id,
          }, (err, student) => {
            if (err) {
              res.status(500).json({
                status: 'error',
                message: err.message,
              });
            } else {
              // Return
              res.status(200).json({
                message: 'Student logged in',
                student,
                name: decoded.name,
              });
            }
          });
        } else if (decoded.type === 3) {
          SP.find({
            user_id: decoded.id,
          }, (err, sp) => {
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
                  sp,
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
    viewOffers(req, res) {
      const token = req.headers['jwt-token'];
      jwt.verify(token, (decoded) => {
        if (decoded !== null) {
          if (decoded.type === 2) {
            const userMap = [];
            const tempInterest = [];
            const offers = [];
            let k = 0;
            let x = 0;
            let z = 0;

            SI.find({
              student_id: decoded.id
            }, (err, interests) => {
              interests.forEach((StudentInterest) => {

                userMap[k] = StudentInterest.interest_id;
                k += 1;
              });
              //  console.log(userMap[0]);
              Interest.find([], (err, inter) => {
                //  console.log(inter)
                userMap.forEach((stud) => {
                  //console.log(stud)

                  inter.forEach((interest) => {
                    //    console.log(interest._id)

                    if (_.isEqual(interest._id, stud)) {
                      //console.log(interest.name)
                      tempInterest[x] = interest.name;
                      x++;
                    }
                  });
                });
                Offer.find({}).sort({$natural:-1}).populate('sp_id', {
                  password: 0
                }).exec((err, off) => {
                  //console.log(off)
                  tempInterest.forEach((name) => {
                    off.forEach((offerfield) => {
                      //        console.log(offerfield.field)
                      if (_.isEqual(name, offerfield.field)) {
                        //    console.log(11)
                        offers[z] = offerfield;
                        z += 1;
                      }
                    });



                  });
                  Student.findOne({
                    user_id: decoded.id
                  }, (err, student) => {
                    if (err && z !== 0) {
                      return res.status(500).json({
                        status: 'error',
                        message: err.message,
                      });
                      return 0;
                    } else if (z != 0) {
                      //  //console.log(student);
                      res.status(200).json({
                        status: 'success',
                        data: {
                          offers,
                          student,

                        },
                      });
                      return 0;
                    } else if (z === 0) {
                      Offer.find({}).populate('sp_id', {
                        password: 0
                      }).exec((err, offers) => {

                        if (err) {
                          return res.status(500).json({
                            status: 'error',
                            message: err.message,
                          });
                          return 0;
                        } else {


                          Student.findOne({
                            user_id: decoded.id
                          }, (err, student) => {
                            if (err) {
                              //console.log(err);
                            } else {
                              //  //console.log(student);

                              res.status(200).json({
                                status: 'success',
                                data: {
                                  offers,
                                  student,

                                },
                              });
                              return 0;
                            }
                          });



                        }



                      });



                    }
                  });
                });
              });
            });

          } else {
            return res.status(500).json({
              err: 'unauthorized access',
            });
          }
        }
      });
    },viewAllOffers(req, res) {
      const token = req.headers['jwt-token'];
      jwt.verify(token, (decoded) => {
        if (decoded !== null) {
          if (decoded.type === 2) {
            Offer.find({}).sort({$natural:-1}).populate('sp_id').exec((err, offers) => {
                  
                  Student.findOne({
                    user_id: decoded.id
                  }, (err, student) => {
                    if (err) {
                      res.status(400).json({
                        err: err
                      });
                    } else{
                      res.status(200).json({
                        status: 'success',
                        data: {
                          offers,
                          student,

                        },
                      });
                    }
                  });
                });
          } else {
            return res.status(500).json({
              err: 'unauthorized access',
            });
          }
        }
      });
    },
    resetPassword(req, res) {

      req.checkBody('email', 'Email is required').notEmpty();
      req.checkBody('email', 'Enter a correct Email Format').isEmail();



      var errors = req.validationErrors();

      if (errors) {
        //console.log("error RPW");
        res.status(400).json({
          err: errors

        });
      } else {
        const email = req.body.email;
        const password = generatePassword();
        //  //console.log(password);
        User.findOne({
          email: email,
        }, (err, user) => {
          // if there are any errors, return the error
          if (err) {
            res.json(err);
          } else {
            User.findByIdAndUpdate(user._id, {
              $set: {
                password
              }
            }, {
              safe: true,
              upsert: true,
              new: true
            }, (updateerr) => {
              res.json(
                `Password resetted successfully to ${password} , and an email was sent to the user with the new password.`
              );
            });
          }
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
          to: req.body.email, // list of receivers
          subject: 'Password reset inquiry ✔', // Subject line
          text: `Dear Sir/Madam, you have requested to reset your password for our system. You can now login using your email and password = ${
                password}`, // plain text body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            res.status(500).json({
              status: 'error',
              message: error,
            });
          }
          //console.log('Message %s sent: %s', info.messageId, info.response);
        });
      }
    },
    getsignedvals(req, res) {
      const token = req.body.token;
      jwt.verify(token, (decoded) => {
        res.json(decoded);
      });
    },
};

module.exports = homeController;
