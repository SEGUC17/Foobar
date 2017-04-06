let Offer = require('../models/Offer');
let Interest = require('../models/Interests');
let SI = require('../models/StudentInterest');
let Student = require('../models/Student');
let SP = require('../models/ServiceProvider');
let User = require('../models/User');
const generatePassword = require('password-generator'); // a dependency that generates random password
// 'use strict';
const nodemailer = require('nodemailer'); //a dependency that sends an email to user

let homeController = {
  findProfile: function(req, res) {
    const user = req.user;
    if (user && user.type == 1) {
      res.json("Admin logged in");
    } else if (user && user.type == 2) {
      Student.find({
        user_id: req.user.id
      }, function(err, student) {
        if (err)
          res.send(err.message);
        else {
          // Return
          res.json({
            message: "Student logged in",
            user: user
          });
        }
      });
    } else if (user && user.type == 3) {
      SP.find({
        user_id: req.user.id
      }, function(err, sp) {
        if (err)
          res.send(err.message);
        else {
          // Return
          res.json("Service Provider logged in");
        }
      });
    } else{
      res.send("No user logged in");
    }
  },
  viewOffers: function(req, res) {
    const user = res.locals.user;
    if (user && user.type == 2) {
      SI.find({
        student_id: user.id
      }, function(err, studentinterests) {
        if (err)
          res.send(err.message);
        else {
          Interest.find({
            id: {
              $in: studentinterests.interest_id
            }
          }, function(err, interests) {

            if (err)
              res.send(err.message);
            else {
              Offer.find({
                field: {
                  $in: interests.name
                }
              }, function(err, offers) {
                if (err)
                  res.send(err.message);
                else {
                  // Return
                  res.json('Viewing offers');
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
        if (err)
          res.send(err.message);
        else {
          // Return
          res.json({
            offers: offers
          });
        }
      });
    }

  },
  resetPassword: function(req, res){
    var email = req.body.email;
    var password = generatePassword();
    User.findOne({
          'local.email': email
        }, function(err, user) {
          // if there are any errors, return the error
          if (err)
            res.send(err);
          else //a user is found with the submitted email
          { 
              User.findByIdAndUpdate(user.id, {
                $set: {
                  'local.password': user.generateHash(password)
                }
              }, {
                safe: true,
                upsert: true,
                new: true
              }, function(err, newUser) {
                res.send('Password resetted successfully to ' + password + ' , and an email was sent to the user with the new password.');
                console.log(newUser);
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
        text: 'Dear Sir/Madam, you have requested to reset your password for our system. You can now login using your email and password = ' + password // plain text body
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
      });


  }
};

module.exports = homeController;
