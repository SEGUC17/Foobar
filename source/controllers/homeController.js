const Offer = require('../models/Offer');
const Interest = require('../models/Interests');
const SI = require('../models/StudentInterest');
const Student = require('../models/Student');
const SP = require('../models/ServiceProvider');
const User = require('../models/User');
const generatePassword = require('password-generator'); // a dependency that generates random password
const nodemailer = require('nodemailer'); // a dependency that sends an email to user

const homeController = {
  findProfile(req, res) {
    const user = req.user;
    if (user && user.type === 1) {
      res.status(200).json({
        status: 'success',
        data: {
          message: 'Admin logged in',
        },
      });
    } else if (user && user.type === 2) {
      Student.find({
        user_id: req.user.id,
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
            user: student,
          });
        }
      });
    } else if (user && user.type === 3) {
      SP.find({
        user_id: req.user.id,
      }, (err) => {
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
  },
  viewOffers(req, res) {
    const user = req.user;
    if (user && user.type === 2) {
      SI.find({
        student_id: user.id,
      }, (err, studentinterests) => {
        if (err) {
          res.status(500).json({
            status: 'error',
            message: err.message,
          });
        } else {
          const siid = [];
          for (let index = 0; index < studentinterests.length; index += 1) {
            siid.push(studentinterests[index].id);
          }
          Interest.find({
            id: {
              $in: siid,
            },
          }, (finderr, interests) => {
            if (finderr) {
              res.status(500).json({
                status: 'error',
                message: finderr.message,
              });
            } else {
              Offer.find({
                field: {
                  $in: interests.name,
                },
              }, (anotherfinderr, offers) => {
                if (err) {
                  res.status(500).json({
                    status: 'error',
                    message: anotherfinderr.message,
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
        limit: 10,
      }, (err, offers) => {
        if (err) {
          res.status(500).json({
            status: 'error',
            message: err.message,
          });
        } else {
          // Return
          res.json({
            offers,
          });
        }
      });
    }
  },
  resetPassword(req, res) {
    const email = req.body.email;
    const password = generatePassword();
    User.findOne({
      'local.email': email,
    }, (err, user) => {
      // if there are any errors, return the error
      if (err) {
        res.status(500).json({
          status: 'error',
          message: err.message,
        });
      } else { // a user is found with the submitted emai
        User.findByIdAndUpdate(user.id, {
          $set: {
            'local.password': user.generateHash(password),
          },
        }, {
          safe: true,
          upsert: true,
          new: true,
        }, (updateerr) => {
          if (updateerr) {
            res.status(500).json({
              status: 'error',
              message: updateerr.message,
            });
          } else {
            res.status(200).json({
              status: 'success',
              data: {
                message: 'Password resetted successfully to and an email was sent to the user with the new password.',
              },
            });
          }
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
      to: email, // list of receivers
      subject: 'Password reset inquiry ✔', // Subject line
      text: `Dear Sir/Madam, you have requested to reset your password for our system. You can now login using your email and password = ${
        password}`, // plain text body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
      return undefined;
    });
  },
};

module.exports = homeController;
