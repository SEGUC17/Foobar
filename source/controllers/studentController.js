const User = require('../models/User');
const Offer = require('../models/Offer');
const Reservation = require('../models/Reservation');
const Skill = require('../models/Skill');
const Tag = require('../models/Tag');
const StudentInterest = require('../models/StudentInterest');
const Review = require('../models/Review');
const Student = require('../models/Student');
const Interests = require('../models/Interests');
const Comment = require('../models/Comment');
const jwt = require('../auth/jwt');


// const ServiceProvider = require('../models/ServiceProvider');

const StudentController = {


    approveReservation(req, res) {
        const token = req.headers['jwt-token'];
        jwt.verify(token, (decoded) => {
            if (decoded.type === 3) {
                Reservation.findOne({
                    _id: req.body.id,
                }, (err, reservation) => {
                    if (err) {
                        res.status(500).json({
                            status: 'error',
                            message: err.message,
                        });
                    } else if (req.body.approve) {
                        Reservation.findByIdAndUpdate(req.body.id, {
                            $set: {
                                status: 1,
                            },
                        }, {
                            safe: true,
                            upsert: true,
                            new: true,
                        }, (err, reservation) => {
                            res.status(200).json({
                                status: 'success',
                                data: { // Data can be null if, for example, delete request was sent
                                    message: `Approved successfully ${reservation}`,
                                },
                            });
                        });
                    } else if (!req.body.approve) {
                        Reservation.findByIdAndUpdate(req.body.id, {
                            $set: {
                                status: 2,
                            },
                        }, {
                            safe: true,
                            upsert: true,
                            new: true,
                        }, (err, reservation) => {
                            res.status(200).json({
                                status: 'success',
                                data: { // Data can be null if, for example, delete request was sent
                                    message: `Disapproved successfully ${reservation}`,
                                },
                            });
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


    addReview(req, res) {
        //    console.log(1);
        //req.checkBody('rating', 'Rating is required').notEmpty();
        req.checkBody('content', 'Content is required').notEmpty();

        var errors = req.validationErrors();

        if (errors) {
            res.status(400).json({
                err: errors

            });
        } else {
            const token = req.headers['jwt-token'];
            jwt.verify(token, (decoded) => {
                if (decoded.type === 2) {
                    const review = new Review({
                        reviewer_id: decoded.id,
                        sp_id: req.body.sp_id,
                        rating: req.body.rating,
                        content: req.body.content,

                    }).save((err, review) => {
                        if (err) {
                            res.status(500).json({
                                status: 'error',
                                message: err.message,
                            });
                        } else {
                            res.status(200).json({
                                status: 'success',
                                data: {
                                    review,
                                },
                            });
                        }
                    });
                } else {
                    res.status(500).json({
                        err: 'unauthorized access',
                    });
                }
            });
        }
    },
    addComment(req, res) {


        req.checkBody('content', 'Content is required').notEmpty();

        var errors = req.validationErrors();

        if (errors) {
            res.status(400).json({
                err: errors

            });
        } else {

            const token = req.headers['jwt-token'];
            jwt.verify(token, (decoded) => {
                const comment = new Comment({
                    commenter_id: decoded.id,
                    review_id: req.body.review_id,
                    content: req.body.content,

                }).save((err, comment) => {
                    if (err) {
                        res.status(500).json({
                            status: 'error',
                            message: err.message,
                        });
                    } else {
                        res.status(200).json({
                            status: 'success',
                            data: {
                                comment,
                            },
                        });
                    }
                });
            });
        }
    },
    search(req, res) { //searching for an offer by name
      Offer.find({
        $text: {
          $search: req.body.search,
        }
      }).exec(function(err, offers) {
        if (err) {
          res.status(500).json({
            status: 'error',
            message: err.message,
          });
        } else {
          res.status(200).json({
            status: 'success',
            data: {
              offers,
            },
          });
        }
      });
    },
    seeProgress(req, res) {
        const token = req.headers['jwt-token'];
        jwt.verify(token, (decoded) => {
            if (decoded.type === 2) {
                Skill.find({
                    user_id: decoded.id,
                }, (err, skills) => {
                    if (err) {
                        res.status(500).json({
                            status: 'error',
                            message: err.message,
                        });
                    } else {
                        res.status(200).json({
                            status: 'success',
                            data: {
                                skills,
                            },
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
    applyOffer(req, res) {
        const token = req.headers['jwt-token'];
        jwt.verify(token, (decoded) => {
            if (decoded.type === 2) {
                Offer.findOne({
                    _id: req.body.offer_id,
                }, (err, offer) => {
                    if (err) {

                        res.status(500).json({
                            status: 'error',
                            message: err.message,
                        });
                    } else {
                        var d = new Date().toISOString();


                        if (offer.due_date < d) {
                            res.status(403).json({
                                status: 'error',
                                message: "You can't register now",
                            });
                        } else if (offer.capacity > 0) {
                            console.log(offer.sp_id);
                            const reservation = new Reservation({

                                user_id: decoded.id,
                                offer_id: offer.id,
                                service_provider_id: offer.sp_id,
                                reservation_date: Date.now(),
                                status: 1,
                                is_assessed: false,
                                charge_id: req.body.charge_id,
                            });
                            reservation.save((err, reservation) => {
                                if (err) {
                                    res.status(500).json({
                                        status: 'error',
                                        message: err.message,
                                    });
                                } else {
                                    offer.capacity -= 1;
                                    offer.save((err, reservation) => {
                                        if (err) {
                                            res.status(500).json({
                                                status: 'error',
                                                message: err.message,
                                            });
                                            console.log(err);
                                        } else {
                                            res.status(200).json({
                                                status: 'success',
                                                data: {
                                                    reservation,
                                                },
                                            });
                                        }
                                    });
                                }
                            });
                        } else {
                            res.status(304).json({
                                status: 'error',
                                message: 'No spots available',
                            });
                        }
                    }
                });
            } else {
                res.status(500).json({
                    err: 'unauthorized access',
                });
            }
        });
    },
    viewStudent(req, res) {
        console.log(req.params.id);
        User.findOne({
            _id: req.params.id,
        }, (err, user) => {
            if (err) {
                res.status(500).json({
                    status: 'error',
                    message: err.message,
                });
            } else {
                Student.findOne({
                    user_id: req.params.id,
                }, (err, student) => {
                    // Render
                    console.log(student);
                    console.log(user);
                    res.status(200).json({
                        status: 'success',
                        data: {
                            student,
                            user,
                        },
                    });
                });
            }
        });
    },


    viewReviews(req, res) {
        const token = req.headers['jwt-token'];
        jwt.verify(token, (decoded) => {
            if (decoded.type === 2) {
                console.log(1);
                Review.find({
                    sp_id: req.body.sp_id
                }).populate('reviewer_id').populate('sp_id').exec((err,
                    reviews) => {
                    if (err) {
                        res.status(500).json({
                            status: 'error',
                            message: err.message,
                        });
                    } else {
                        res.status(200).json({
                            status: 'success',
                            data: {
                                reviews,
                            },
                        });
                        console.log(reviews);
                    }
                });
            } else {
                res.status(500).json({
                    err: err.message,
                });
            }
        });
    },
    editPassword(req, res) {

        const token = req.headers['jwt-token'];
        jwt.verify(token, (decoded) => {
            if (decoded.type === 2) {
                User.find({ _id: req.body.id }, function(err, user) {
                    if (err)
                        return err;
                    else {
                        console.log(user[0].password);
                        console.log(req.body.oldPassword)
                        console.log(req.body.newPassword)
                        console.log(req.body.confirmNewPassword)
                        
                        req.checkBody('oldPassword', 'Your old Password is required').notEmpty();
                        req.checkBody('newPassword', 'A new Password is required').notEmpty();
                        req.checkBody('oldPassword', 'Passwords do not match').equals(user[0].password);
                        req.checkBody('confirmNewPassword', 'Confirm Password does not match newPassword').equals(req.body.newPassword);
                        var errors = req.validationErrors();
                        if (errors) {
                            console.log('errors here');
                            res.status(400).json({
                                err: errors

                            });
                        } else {
                            console.log('should modify');
                            User.findByIdAndUpdate(decoded.id, {
                                $set: {
                                    password: req.body.newPassword,
                                },
                            }, {
                                safe: true,
                                upsert: true,
                                new: true,
                            }, (err, sP) => {
                                console.log('modified!');
                                res.status(200).json({
                                    status: 'success',
                                    data: {
                                        message: `Edited Password correctly!`,
                                    },
                                });
                            });
                        }

                    }
                });



            } else {
                res.status(500).json({
                    err: 'unauthorized access',
                });
            }
        });
    },



    editStudent(req, res) {

        req.checkBody('name', 'Name is required').notEmpty();
        req.checkBody('university', 'University is required').notEmpty();

        // req.checkBody('description', 'A Description is required').notEmpty();
        // req.checkBody('address', 'A Date is required').notEmpty()

        // req.checkBody('birthdate', 'A Date is required').notEmpty()
        // req.checkBody('birthdate', 'Wrong Date Format').isDate();



        var errors = req.validationErrors();

        if (errors) {
            res.status(400).json({
                err: errors

            });
        } else {
            const token = req.headers['jwt-token'];
            jwt.verify(token, (decoded) => {
                if (decoded.type === 2) {
                    User.find({
                        _id: decoded.id,
                    }, (err) => {
                        if (err) {
                            res.status(500).json({
                                status: 'error',
                                message: err.message,
                            });
                        } else {
                            Student.find({
                                user_id: decoded.id,
                            }, (err, student) => {
                                if (err) {
                                    res.status(500).json({
                                        status: 'error',
                                        message: err.message,
                                    });
                                } else {
                                    const name = req.body.name;
                                    const university = req.body.university;
                                    const address = req.body.address;
                                    const birthdate = req.body.birthdate;
                                    const description = req.body.description;
                                    const phone_number = req.body.phone_number;

                                    StudentInterest.remove({
                                        student_id: student.user_id,
                                    }, (err) => {
                                        if (err) {
                                            res.status(500).json({
                                                status: 'error',
                                                message: err.message,
                                            });
                                        }
                                    });

                                    for (let i = 0; i < Interests.length; i++) {
                                        const newInterset = new StudentInterest({
                                            student_id: decoded.id,
                                            interest_id: Interests[i],
                                        });

                                        newInterset.save((err) => {
                                            if (err) {
                                                res.json({
                                                    mssg: 'Student interests updating error ',
                                                });
                                            }
                                        });
                                    }

                                    User.update({
                                        _id: decoded.id,
                                    }, {
                                        name,
                                    }, (err, u1) => {
                                        if (err) {
                                            res.status(500).json({
                                                status: 'error',
                                                message: err.message,
                                            });
                                        } else {
                                            // res.json({
                                            //   mssg: 'uname updated',
                                            // });

                                            Student.update({
                                                user_id: decoded.id,
                                            }, {
                                                university,
                                                address,
                                                birthdate,
                                                description,
                                                phone_number
                                            }, (err, student1) => {
                                                if (err) {
                                                    res.status(500).json({
                                                        status: 'error',
                                                        message: err.message,
                                                    });
                                                } else {
                                                    res.json({
                                                        mssg: 'student updated',
                                                    });
                                                }
                                            });
                                        }
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
        }
    },
};

module.exports = StudentController;
