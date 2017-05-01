// const user = require('../models/User');
const Announcement = require('../models/Announcement');
const interest = require('../models/Interests');
const StudentInterest = require('../models/StudentInterest');
const SP = require('../models/ServiceProvider');
const PendingSP = require('../models/PendingSP');
const User = require('../models/User');
const generatePassword = require('password-generator'); // a dependency that generates random password
const nodemailer = require('nodemailer'); // a dependency that sends an email to user
const Offer = require('../models/Offer');
const Student = require('../models/Student');
const jwt = require('../auth/jwt');

const adminController = {

  Occurances(arr) {
      var a = [],
        b = [],
        prev
      arr.sort();
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== prev) {
          a.push(arr[i]);
          b.push(1);
        } else {
          b[b.length - 1]++;
        }
        prev = arr[i];
      }
      return [a, b];
    },

    blockS(req, res) {
      const token = req.headers['jwt-token'];
      jwt.verify(token, (decoded) => {
        if (decoded.type === 1) {
          const token = req.headers['jwt-token'];
          jwt.verify(token, (decoded) => {
            const studemail = req.body.email;
            User.findOne({
              is_deleted: false,
              type: 2,
              is_blocked: false,
              email: studemail
            }, (err, users) => {
              if (err === null && users == null) {

                err = new Error(studemail + ' not found');
              }
              if (err) {
                res.status(500).json({
                  status: 'error',
                  message: err,
                });
              } else {
                users.is_blocked = true
                res.status(200).json({
                  status: 'success',
                  data: {
                    users,

                  },
                });
                users.save((err) => {
                  if (err) {
                    res.status(500).json({
                      status: 'error',
                      message: err,
                    });
                  }
                });
              }
            });

          });
        } else {
          res.json({
            status: 'failure',
            data: {
              err: 'unauthorized access',
            },
          });
        }

      });
    },
    blockSP(req, res) {
      const token = req.headers['jwt-token'];
      jwt.verify(token, (decoded) => {
        if (decoded.type === 1) {
          const token = req.headers['jwt-token'];
          jwt.verify(token, (decoded) => {
            const studemail = req.body.email;
            User.findOne({
              is_deleted: false,
              type: 3,
              is_blocked: false,
              email: studemail
            }, (err, users) => {
              if (err === null && users == null) {

                err = new Error(studemail + ' not found');
              }
              if (err) {
                res.status(500).json({
                  status: 'error',
                  message: err,
                });
              } else {
                users.is_blocked = true
                res.status(200).json({
                  status: 'success',
                  data: {
                    users,

                  },
                });
                users.save((err) => {
                  if (err) {
                    res.status(500).json({
                      status: 'error',
                      message: err,
                    });
                  }
                });
              }
            });

          });
        } else {
          res.json({
            status: 'failure',
            data: {
              err: 'unauthorized access',
            },
          });
        }

      });
    },
    deleteS(req, res) {
      const token = req.headers['jwt-token'];
      jwt.verify(token, (decoded) => {
        if (decoded.type === 1) {
          const token = req.headers['jwt-token'];
          jwt.verify(token, (decoded) => {
            const studemail = req.body.email;
            User.findOne({
              is_deleted: false,
              type: 2,
              email: studemail
            }, (err, users) => {
              if (err === null && users == null) {

                err = new Error(studemail + ' not found');
              }
              if (err) {
                res.status(500).json({
                  status: 'error',
                  message: err,
                });
              } else {
                users.is_deleted = true
                res.status(200).json({
                  status: 'success',
                  data: {
                    users,

                  },
                });


                users.save((err) => {
                  if (err) {
                    res.status(500).json({
                      status: 'error',
                      message: err,
                    });
                  }
                });
              }
            });

          });
        } else {
          res.json({
            status: 'failure',
            data: {
              err: 'unauthorized access',
            },
          });
        }

      });
    },

    getAllStudents(req, res) { // viewing all admins
      const token = req.headers['jwt-token'];
      jwt.verify(token, (decoded) => {
        if (decoded.type === 1) {
          Student.find({}).populate('user_id').exec((err, students) => {
            if (err) {
              res.status(500).json({
                status: 'error',
                message: err,
              });
            } else {
              res.status(200).json({
                status: 'success',
                data: {
                  students,
                },
              });
              // res.render('viewAnnouncements', {announcements:announcements});
            }

          });

        } else {
          res.json({
            status: 'failure',
            data: {
              err: 'unauthorized access',
            },
          });
        }
      });
    },

    getAllAdmins(req, res) { // viewing all admins
      const token = req.headers['jwt-token'];
      jwt.verify(token, (decoded) => {
        if (decoded.type === 1) {
          User.find({
            type: 1,
          }, (err, admins) => {
            if (err) {
              res.status(500).json({
                status: 'error',
                message: err,
              });
            } else {
              res.status(200).json({
                status: 'success',
                data: {
                  admins,
                },
              });
              // res.render('viewAnnouncements', {announcements:announcements});
            }
          });
        } else {
          res.json({
            status: 'failure',
            data: {
              err: 'unauthorized access',
            },
          });
        }
      });
    },

    approveOrDisapproveSP(req, res) { // approving or disapproving an applied SP
      const token = req.headers['jwt-token'];
      jwt.verify(token, (decoded) => {
        if (decoded.type === 1) {
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
                is_blocked: false,
                email,
                password,
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
              user_id: newUser._id,
              description,
              phoneNumber,
              lat: '',
              lang: ''
            });

            newSP.save((err) => {
              if (err) {
                res.status(500).json({
                  status: 'error',
                  message: err,
                });
              } else {
                res.status(200).json({
                  status: 'success',
                  data: { // Data can be null if, for example, delete request was sent
                    message: `Removed him from PendingSP Collection and Added to user collection as:${newUser}and to the SP collection as:${newSP}`,
                  },
                });
              }
            }); // saving SP instance


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
          } else if (req.body.disapprove) {
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
        } else {
          res.status(500).json({
            err: 'unauthorized access',
          });
        }
      });
    },
    sortByFrequencyAndFilter: function(myArray) {
      var newArray = [];
      var freq = {};

      //Count Frequency of Occurances
      var i = myArray.length - 1;
      for (var i; i > -1; i--) {
        var value = myArray[i];
        freq[value] == null ? freq[value] = 1 : freq[value]++;
      }
      // //console.log(freq);
      //Create Array of Filtered Values
      for (var value in freq) {
        newArray.push(value);
      }

      //Define Sort Function and Return Sorted Results
      function compareFreq(a, b) {
        return freq[b] - freq[a];
      }

      return newArray.sort(compareFreq);
    },
    adminPostAnnouncement(req, res) {
      const token = req.headers['jwt-token'];
      jwt.verify(token, (decoded) => {
        if (decoded.type === 1) {
          const announcement = new Announcement({
            title: req.body.title,
            announcer_id: decoded.id,
            content: req.body.content,
            type: 'Admin Announcement',
          });


          announcement.save((err) => {
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
                announcement,
              },
            });
            return undefined;
          });
        } else {
          res.status(500).json({
            err: 'unauthorized access',
          });
        }
      });
    },
    reviewDataAnalysis(req, res) {
      var userMap = [];
      var temp = [];
      var k = 0;
      var most = 0;
      var least = 0;
      var frequency = [];
      // const token = req.headers['jwt-token']; + jwt.verify(token, (decoded) => {

      //     if (decoded.type === 1) {
      StudentInterest.find([]).populate('interest_id').exec((err, interests) => {
        // //console.log(interests)
        interests.forEach((rest) => {
          if (rest.interest_id !== undefined && rest.interest_id !==
            null) {
            //console.log(rest.interest_id.name);
            userMap[k] = rest.interest_id.name;
            k += 1;
          }
        });
        //console.log(userMap)
        frequency = adminController.Occurances(userMap);
        //console.log(frequency[0]);

        temp = adminController.sortByFrequencyAndFilter(userMap)

        most = temp[0];
        least = temp[temp.length - 1];

        if (err) {
          res.status(500).json({
            status: 'error',
            message: err,
          });
        } else {

          res.status(200).json({
            status: 'success',
            data: {
              most,
              least,
              temp,
              frequency
            },
          });
          // res.render('viewAnnouncements', {announcements:announcements});
        }

      });


      // } else {
      //     res.json({
      //         status: 'failure',
      //         data: {
      //             err: 'unauthorized access',
      //         },
      //     });
      //     }
      // });
    },

    deleteSP(req, res) {
      const token = req.headers['jwt-token'];
      jwt.verify(token, (decoded) => {
        if (decoded.type === 1) {
          let found = false;
          const serviceid = req.params.id;

          SP.findById(serviceid, (err, sp) => {
            if (err) {
              res.status(500).json({
                status: 'error',
                message: err,
              });
            } else {
              Offer.find({
                sp_id: sp.user_id,
              }, (finderr, offers) => {
                if (finderr) {
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
                User.findById(sp.user_id, (finderr, userfound) => {
                  if (finderr) {
                    res.status(500).json({
                      status: 'error',
                      message: finderr,
                    });
                  } else {
                    const user = userfound;
                    user.is_blocked = true;
                    user.save((saveerr) => {
                      if (saveerr) {
                        res.status(500).json({
                          status: 'error',
                          message: err,
                        });
                      } else {
                        // Return
                        res.status(200).json({
                          msg: 'Blocked',
                        });
                      }
                    });
                  }
                });
              } else {
                User.findById(sp.user_id, (finderr, userfound) => {
                  if (finderr) {
                    res.status(500).json({
                      status: 'error',
                      message: err,
                    });
                  } else {
                    const user = userfound;
                    user.is_deleted = true;
                    user.save((saveerr) => {
                      if (saveerr) {
                        res.status(500).json({
                          status: 'error',
                          message: err,
                        });
                      } else {
                        // Return
                        res.status(200).json({
                          msg: 'Deleted',
                        });
                      }
                    });
                  }
                });
              }

              sp.save((saveerr) => {
                if (saveerr) {
                  res.status(500).json({
                    status: 'error',
                    message: err,
                  });
                } else {
                  // Return
                  // res.status(200).json({
                  //   mssg: 'Deleted',
                  // });
                }
              });
            }
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
    },

    addAdmin(req, res) {
      const token = req.headers['jwt-token'];
      jwt.verify(token, (decoded) => {
        if (decoded.type === 1) {
          User.findOne({
            email: req.body.email,
          }, (err, admin) => {
            if (err) {
              res.json(err.message);
            } else if (admin) {
              res.status(500).json({
                status: 'error',
                message: 'This email is already registered. Change email',
              });
            } else {
              const password = generatePassword();
              const newuser = new User({
                email: req.body.email,
                password,
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
                      user: newuser,
                    },
                  });
                }
              });
            }
          });
        } else {
          res.status(500).json({
            err: 'unauthorized access',
          });
        }
      });
    },
    deleteStudent(req, res) {
      const token = req.headers['jwt-token'];
      jwt.verify(token, (decoded) => {
        if (decoded.type === 1) {
          Student.findById(req.params.id, (err, student) => {
            if (err) {
              res.status(500).json({
                status: 'error',
                message: err,
              });
            } else if (student) {
              User.findById(student.user_id, (finderr, userfound) => {
                if (finderr) {
                  res.status(500).json({
                    status: 'error',
                    message: finderr,
                  });
                } else {
                  const user = userfound;
                  user.is_deleted = true;
                  user.save((saveerr) => {
                    if (saveerr) {
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
            message: 'unauthorized access',
          });
        }
      });
    },

};

module.exports = adminController;
