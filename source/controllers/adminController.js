// const user = require('../models/User');
const Announcement = require('../models/Announcement');
const interest = require('../models/Interests');
const SP = require('../models/ServiceProvider');
const PendingSP = require('../models/PendingSP');
const User = require('../models/User');
const generatePassword = require('password-generator'); // a dependency that generates random password
// 'use strict';
const nodemailer = require('nodemailer'); // a dependency that sends an email to user
const Offer = require('../models/Offer');
const Student = require('../models/Student');
const StudentInterest = require('../models/StudentInterest');


const adminController = {

  approveOrDisapproveSP(req, res) { // approving or disapproving an applied SP
    const spId = req.body.id;
    // if approve is selected
    if (req.body.approve) {
      // getting the attributes before removing
      const name = req.body.name;
      const email = req.body.email;
      const phoneNumber = req.body.phone_number;
      const description = req.body.description;
      const password = generatePassword();
      PendingSP.findByIdAndRemove(spId, (err) => {
        if (err) {
          res.status(500).json({
            status: 'error',
            message: err,
          });
        }
      });

      // creating new user since he is approved
      const newUser = new User({
        name,
        type: 3,
        is_deleted: false,
        'local.email': email,
        'local.password': password,
      });

      newUser.save((err) => {
        if (err) {
          res.status(500).json({
            status: 'error',
            message: err,
          });
        }
      }); // saving user instance

      // creating new SP account
      const newSP = new SP({
        description,
        phoneNumber,
        is_blocked: false,
        is_deleted: false,
      });

      newSP.save((err) => {
        if (err) {
          res.status(500).json({
            status: 'error',
            message: err,
          });
        }
      }); // saving SP instance

      res.status(200).json({
        status: 'success',
        data: { // Data can be null if, for example, delete request was sent
          message: `Removed him from PendingSP Collection and Added to user collection as:${newUser}and to the SP collection as:${newSP}`,
        },
      });

      // create reusable transporter object using the default SMTP transport
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
        text: `Congratulations! You have been approved to our system and now you can login using your email and password:${
          password}`, // plain text body
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return undefined;
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        return undefined;
      });
    } else if (req.body.disapprove) {
      // if disapprove is selected
      // finding the target sp and setting is_declined attr. to true
      PendingSP.findByIdAndUpdate(spId, {
        $set: {
          is_declined: true,
        },
      }, {
        safe: true,
        upsert: true,
        new: true,
      }, (err, sP) => {
        res.status(200).json({
          status: 'success',
          data: { // Data can be null if, for example, delete request was sent
            message: `Disapproved successfully ${sP}`,
          },
        });
      });
    }
  },
  sortByFrequencyAndFilter(myArray) {
    const newArray = [];
    const freq = [];

    // Count Frequency of Occurances
    let i = myArray.length - 1;
    for (i; i > -1; i = -1) {
      const value = myArray[i];
      if (freq[value] == null) {
        freq[value] = 1;
      } else {
        freq[value] += 1;
      }
    }

    // Create Array of Filtered Values
    freq.forEach((value) => {
      newArray.push(value);
    }, this);

    // Define Sort Function and Return Sorted Results
    function compareFreq(a, b) {
      return freq[b] - freq[a];
    }

    return newArray.sort(compareFreq);
  },

  adminPostAnnouncement(req, res) {
    const user = req.user;

    const announcement = new Announcement({
      title: req.body.title,
      announcer_id: user.id,
      content: req.body.content,
      type: 'Admin',
    });


    announcement.save((err, annposted) => {
      if (err) {
        res.status(500).json({
          status: 'error',
          message: err,
        });
        return undefined;
      }
      res.status(200).json({
        status: 'success',
        data: {
          announcement: annposted,
        },
      });
      return undefined;
    });
  },
  reviewDataAnalysis(req, res) {
    const userMap = [];
    const tempInterest = [];
    let k = 0;
    let x = 0;

    StudentInterest.find([], (sIerr, interests) => {
      interests.forEach((element) => {
        userMap[k] = element.interest_id;
        k += 1;
      });
      interest.find([], (err, inter) => {
        userMap.forEach((stud) => {
          inter.forEach((element) => {
            if (stud === element.id) {
              tempInterest[x] = interest.name;
              x += 1;
            }
          });
        });
        const temp = adminController.sortByFrequencyAndFilter(
          tempInterest);
        const most = temp[0];
        const least = temp[temp.length - 1];
        res.status(200).json({
          status: 'success',
          data: {
            most,
            least,
          },
        });
      });
    });
  },

  deleteSP(req, res) {
    let found = false;
    const user = req.user;
    if (user && user.type === 1) { // Checking if admin
      SP.findById(req.params.id, (err, sp) => {
        const foundSp = sp;
        if (err) { res.json(err.message); } else {
          Offer.find({
            sp_id: sp.id,
          }, (offererr, offers) => {
            if (offererr) {
              res.status(500).json({
                status: 'error',
                message: err,
              });
            } else {
              for (let i = 0; i < offers.length; i += 1) {
                if (offers[i].end_date > Date.now()) {
                  found = true;
                  break;
                }
              }
            }
          });

          if (found) {
            foundSp.is_blocked = true;
          } else {
            foundSp.is_deleted = true;
          }

          foundSp.save((saveerr) => {
            if (saveerr) {
              res.status(200).json({
                status: 'success',
                data: {
                  message: saveerr,
                },
              });
            } else {
              res.status(200).json({
                status: 'success',
                data: {
                  message: 'Deleted successfully',
                },
              });
            }
          });
        }
      });
    } else {
      res.status(403).json({
        status: 'error',
        message: 'You are unauthorized',
      });
    }
  },
  addAdmin(req, res) {
    const user = req.user;
    if (user && user.type === 1) {
      User.findOne({
        'local.emai': req.body.email,
      }, (err, admin) => {
        if (err) { res.json(err.message); } else if (admin) {
          res.status(500).json({
            status: 'error',
            message: 'Change email',
          });
        } else {
          const password = generatePassword();
          const newuser = new User({
            'local.email': req.body.email,
            'local.password': user.generateHash(password),
            type: 1,
          });
          newuser.save((newusererr) => {
            if (newusererr) {
              res.status(500).json({
                status: 'error',
                message: newusererr,
              });
            } else {
              res.status(200).json({
                status: 'success',
                data: {
                  message: `Cool job, new admin. Password is: ${password}`,
                },
              });
            }
          });
        }
      });
    } else {
      res.status(403).json({
        status: 'error',
        message: 'You are unauthorized',
      });
    }
  },
  deleteStudent(req, res) {
    const user = req.user;
    if (user && user.type === 1) { // Checking if admin
      Student.findById(req.params.id, (err, student) => {
        if (err) {
          res.status(500).json({
            status: 'error',
            message: err,
          });
        } else if (student) {
          const studentFound = student;
          studentFound.is_deleted = true;
          studentFound.save((saveerr) => {
            if (err) {
              res.status(500).json({
                status: 'error',
                message: saveerr,
              });
            } else {
              res.status(200).json({
                status: 'success',
                data: {
                  message: 'Deleted',
                },
              });
            }
          });
        } else {
          res.status(404).json({
            status: 'error',
            message: 'Not found',
          });
        }
      });
    } else {
      res.status(403).json({
        status: 'error',
        message: 'You are unauthorized',
      });
    }
  },

};

module.exports = adminController;
