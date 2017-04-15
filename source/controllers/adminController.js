// const user = require('../models/User');
const Announcement = require('../models/Announcement');
const interest = require('../models/Interests');
let Admin = require('../models/User');
let SP = require('../models/ServiceProvider');
let PendingSP = require('../models/PendingSP');
let User = require('../models/User');
var generatePassword = require('password-generator'); // a dependency that generates random password
// 'use strict';
const nodemailer = require('nodemailer'); //a dependency that sends an email to user
// const user = require('../models/User');
// const application = require('../models/pendingSP');
let Offer = require('../models/Offer');
let Student = require('../models/Student');
// const application = require('../models/pendingSP');
const jwt = require('../auth/jwt');

const adminController = {

  approveOrDisapproveSP: function(req, res) { //approving or disapproving an applied SP
    const token = req.headers['jwt-token'];
    jwt.verify(token, function(decoded) {
      if (decoded.type == 1) {
        var sP_id = req.body.id;
        //if approve is selected
        if (req.body.approve) {
          //getting the attributes before removing
          var name = req.body.name;
          var email = req.body.email;
          var phone_number = req.body.phone_number;
          var description = req.body.description;
          var password = generatePassword();
          PendingSP.findByIdAndRemove(sP_id, function(err) {
            if (err)
              res.status(500).json({
                err: err.message
              });
          });

          //creating new user since he is approved
          var newUser = new User();

          newUser.name = name;
          newUser.type = 3;
          newUser.is_deleted = false;
          newUser.email = email;
          newUser.password = password;

          newUser.save(function(err, userSuccess) {
            if (err)
              res.status(500).json({
                err: err.message
              });
          }); //saving user instance

          //creating new SP account
          var newSP = new SP({
            description: description,
            phone_number: phone_number,
            is_blocked: false,
            is_deleted: false
          });

          newSP.save(function(err, sPSuccess) {
            if (err)
              res.status(500).json({
                err: err.message
              });
          }); //saving SP instance

          res.status(200).json({
            success: 'Removed him from PendingSP Collection and Added to user collection as: ' +
              newUser + "and to the SP collection as: " + newSP
          });
          // create reusable transporter object using the default SMTP transport
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
            subject: 'System Approval ✔', // Subject line
            text: 'Congratulations! You have been approved to our system and now you can login using your email and password:' +
              password, // plain text body
          };

          // send mail with defined transport object
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              res.status(500).json({
                err: error.message
              });
            }
            console.log('Message %s sent: %s', info.messageId, info
              .response);
          });

        } //if disapprove is selected
        else if (req.body.disapprove) {
          //finding the target sp and setting is_declined attr. to true
          PendingSP.findByIdAndUpdate(sP_id, {
            $set: {
              is_declined: true
            }
          }, {
            safe: true,
            upsert: true,
            new: true
          }, function(err, sP) {
            res.status(200).json({
              mss: 'Disapproved successfully ' + sP
            });

          });
        }
      } else {
        res.status(500).json({
          err: 'unauthorized access'
        });
      }

    });
  },
  sortByFrequencyAndFilter: function(myArray) {
    const token = req.headers['jwt-token'];
    jwt.verify(token, function(decoded) {
      if (decoded.type === 1) {
        var newArray = [];
        var freq = {};

        //Count Frequency of Occurances
        var i = myArray.length - 1;
        for (var i; i > -1; i--) {
          var value = myArray[i];
          freq[value] == null ? freq[value] = 1 : freq[value]++;
        }

        //Create Array of Filtered Values
        for (var value in freq) {
          newArray.push(value);
        }

        //Define Sort Function and Return Sorted Results
        function compareFreq(a, b) {
          return freq[b] - freq[a];
        }

        return newArray.sort(compareFreq);


      } else {
        res.status(500).json({
          err: 'unauthorized access'
        });
      }
    });
  },

  adminPostAnnouncement: function(req, res) {
    const token = req.headers['jwt-token'];
    jwt.verify(token, function(decoded) {
      if (decoded.type === 1) {
        announcement = new Announcement({
          title: req.body.title,
          announcer_id: decoded.id,
          content: req.body.content,
          type: 'Admin'
        });



        announcement.save(function(err, announcement) {
          if (err)
            res.status(500).json({
              err: err.message
            });
          else {
            res.status(200).json({
              obj: announcement
            });
            return 1;
          }
        });
      } else {
        res.status(500).json({
          err: 'unauthorized access'
        });
      }
    });
  },
  reviewDataAnalysis: function(req, res) {
    const token = req.headers['jwt-token'];
    jwt.verify(token, function(decoded) {
      if (decoded.type === 1) {
        var userMap = [];
        var tempInterest = [];
        var k = 0;
        var x = 0;

        StudentInterest.find([], function(err, interests) {


          interests.forEach(function(StudentInterest) {

            userMap[k] = StudentInterest.interest_id;
            k++;
          });
          interest.find([], function(err, inter) {


            userMap.forEach(function(stud) {
              inter.forEach(function(interest) {

                if (stud == interest._id) {

                  tempInterest[x] = interest.name;
                  x++;
                }
              });
            });
            var temp = adminController.sortByFrequencyAndFilter(
              tempInterest);
            most = temp[0];
            least = temp[temp.length - 1];
            res.status(200).json({
              mssg: 'Most Frequent Interest is ' + ">>" +
                most +
                " --  " +
                "The following is the Interests frequency sorted descendengly" +
                ">>>" + temp + "-----" +
                "The least frequent interest is " + " " +
                least
            });


          });
        });

      } else {
        res.status(500).json({
          err: 'unauthorized access'
        });
      }
    });

  },

  deleteSP: function(req, res) {
    const token = req.headers['jwt-token'];
    jwt.verify(token, function(decoded) {
      if (decoded.type === 1) {
        let found = false;


        SP.findById(req.params.id, function(err, sp) {
          if (err)
            res.status(500).json({
              err: err.message
            });
          else {

            Offer.find({
              sp_id: sp.id
            }, function(err, offers) {
              if (err)
                res.status(500).json({
                  err: err.message
                });
              else {
                for (var i = 0; i < offers.length; i++) {
                  if (offers[i].end_date > Date.now()) {
                    found = true;
                    break;
                  }
                }
              }
            });

            if (found) {
              sp.is_blocked = true;
            } else {
              sp.is_deleted = true;
            }

            sp.save(function(err, sp) {
              if (err) {
                res.status(500).json({
                  err: err.message
                });

              } else {
                // Return
                res.status(200).json({
                  mssg: "Deleted"
                });
              }
            });
          }
        });
      } else {
        res.status(500).json({
          err: 'unauthorized access'
        });
      }
    });
  },

  addAdmin: function(req, res) {
    const token = req.headers['jwt-token'];
    jwt.verify(token, function(decoded) {
      if (decoded.type === 1) {
        User.findOne({
          'local.emai': req.body.email
        }, function(err, admin) {
          if (err)
            res.status(500).json({
              err: err.message
            });
          else {
            if (admin) {
              res.status(200).json({
                mssg: "Change email hoe."
              });
            } else {
              let user = new User();
              user.local.email = req.body.email;
              var password = generatePassword();
              user.local.password = user.generateHash(password);
              user.type = 1;
              user.save(function(err, project) {
                if (err) {
                  res.status(500).json({
                    err: err.message
                  });

                } else {
                  res.status(200).json({
                    mssg: "Cool job, new admin. Password is: " +
                      password
                  });
                }
              });
            }
          }
        });
      } else {
        res.status(500).json({
          err: 'unauthorized access'
        });
      }
    });
  },
  deleteStudent: function(req, res) {
      const token = req.headers['jwt-token'];
      jwt.verify(token, function(decoded) {
        if (decoded.type === 1) {
          Student.findById(req.params.id, function(err, student) {
            if (err)
              res.status(500).json({
                err: err.message
              });
            else {
              if (student) {
                student.is_deleted = true;
                student.save(function(err, sp) {
                  if (err) {
                    res.status(500).json({
                      err: err.message
                    });

                  } else {
                    // Return
                    res.status(500).json({
                      mssg: "Deleted"
                    });
                  }
                });
              } else {
                res.status(500).json({
                  mssg: "Not found"
                });
              }
            }
          });
        } else {
          res.status(500).json({
            err: 'unauthorized access'
          });
        }
      });

    }
    // approve : function(sp_id){
    //   var tempMap = [];
    //   var n =0;
    //       application.find([], function(err, application) {
    //
    //
    //           application.forEach(function(application) {
    //
    //             tempMap[n] = application;
    //   n++;
    //           });
    // res.send(tempMap);
    //
    //         });
    //
    //
    // }



};

module.exports = adminController;
