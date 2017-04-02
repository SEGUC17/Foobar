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
      console.log('Decoded =>', decoded)
    });

    return;


    var sP_id = req.body.id;
    //if approve is selected
    if (req.body.approve) {
      //getting the attributes before removing
      var name = req.body.name;
      var email = req.body.email;
      var phone_number = req.body.phone_number;
      var description = req.body.description;
      var password = generatePassword();

      //removing the pending sP instance
      PendingSP.findByIdAndRemove(sP_id, function(err) {
        if (err)
          res.send(err);
      });

      //creating new user since he is approved
      var newUser = new User({
        name: name,
        email: email,
        password: password,
        type: 3,
        is_deleted: false
      });

      newUser.save(); //saving user instance

      //creating new SP account
      var newSP = new SP({
        description: description,
        phone_number: phone_number,
        is_blocked: false,
        is_deleted: false
      });

      newSP.save(); //saving SP instance


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
          return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
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
        console.log(sP);
      });
    }

  },
  sortByFrequencyAndRemoveDuplicates: function(array) {
    let frequency = {},
      value = 0;

    // compute frequencies of each value
    for (var i = 0; i < array.length; i++) {
      value = array[i];
      if (value in frequency) {
        frequency[value]++;
      } else {
        frequency[value] = 1;
      }
    }

    // make array from the frequency object to de-duplicate
    var uniques = [];
    for (value in frequency) {
      uniques.push(value);
    }

    // sort the uniques array in descending order by frequency
    function compareFrequency(a, b) {
      return frequency[b] - frequency[a];
    }

    return uniques.sort(compareFrequency);
  },

  adminPostAnnouncement: function(req, res) {



    announcement = new Announcement({
      title: 'Test',
      announcer_id: 1,
      content: 'Hello world',
      type: 'Admin'
    });



    announcement.save(function(err, announcement) {
      if (err)
        res.send(err.message);
      else {
        res.send(announcement);
        return 1;
      }
    });
  },
  reviewDataAnalysis: function(req, res) {
    var userMap = [];
    var k = 0;
    interest.find([], function(err, interests) {


      interests.forEach(function(interest) {

        userMap[k] = interest.name;
        k++;
      });

      AdminController.sortByFrequencyAndRemoveDuplicates(userMap);
      var least = userMap[userMap.length - 1];


      var count = 1;
      var tempCount = 0;
      var popular = userMap[0];
      console.log(userMap[0]);
      var min = 0;
      var temp = 0;
      for (var i = 0; i < (userMap.length); i++) {

        temp = userMap[i];
        tempCount = 0;
      }

      for (var j = 1; j < userMap.length; j++) {
        if (temp === userMap[j])
          tempCount++;

      }
      if (tempCount > count) {
        popular = temp;
        count = tempCount;
      }



      res.send('Most Frequent Interest is ' + ">>" + popular + " --  " +
        "The following is the Interests frequency sorted descendengly" +
        ">>>" + userMap + "-----" + "The least frequent interest is " +
        " " + least);
    });


  },


  deleteSP: function(req, res) {
    let found = false;
    if (user.type == 1) { // Checking if admin
      SP.findOne({
        id: req.params.sp_id
      }, function(err, sp) {
        if (err)
          res.send(err.message);
        else {

          Offer.find({
            sp_id: sp.id
          }, function(err, offers) {
            if (err)
              res.send(err.message);
            else {
              for (var i = 0; i < offers.length; i++) {
                if (offers[i].end_date > Date.now()) {
                  found = true;
                  break;
                }
              };
            }
          })

          if (found) {
            sp.is_blocked = true;
          } else {
            sp.is_deleted = true;
          }

          sp.save(function(err, sp) {
            if (err) {
              res.send(err.message)
              Console.log(err);
            } else {
              // Return
              Console.log("Deleted");
            }
          })
        }
      })
    } else {
      Console.log("You don't have accesss");
    }
  },

  addAdmin: function(req, res) {
    User.find({
      local: {
        email: req.body.email
      }
    }, function(err, user) {
      if (err)
        res.send(err.message);
      else
      if (user) {
        Console.log("Change email hoe.");
      } else {
        let user = new User(req.body);
        user.type = 1;
        user.save(function(err, project) {
          if (err) {
            res.send(err.message);
            console.log(err);
          } else {
            // Return
          }
        });
      }
    });
  },
  deleteStudent: function(req, res) {
      if (user.type == 1) { // Checking if admin
        Student.findOne({
          id: req.params.sp_id
        }, function(err, student) {
          if (err)
            res.send(err.message);
          else {

            student.is_deleted = true;
            student.save(function(err, sp) {
              if (err) {
                res.send(err.message);
                console.log(err);
              } else {
                // Return
                Console.log("Deleted");
              }
            });
          }
        });
      } else {
        Console.log("You don't have accesss");
      }
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
