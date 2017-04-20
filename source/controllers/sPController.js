const SP = require('../models/ServiceProvider');
const Announcement = require('../models/Announcement');
const Review = require('../models/Review');
const Video = require('../models/Video');
const Reservation = require('../models/Reservation');
const Assessment = require('../models/Assessment');
const Offer = require('../models/Offer');
const Student = require('../models/Student');
const User = require('../models/User');
const Interest = require('../models/Interests');
const jwt = require('../auth/jwt');
const Comment = require('../models/Comment');


const spController = {
        postAnnouncement(req, res) {
            req.checkBody('title', 'Title is required').notEmpty();
            req.checkBody('content', 'Content is required').notEmpty();

            var errors = req.validationErrors();

            if (errors) {
                res.status(400).json({
                    err: errors

                });
            } else {
                const token = req.headers['jwt-token'];
                jwt.verify(token, (decoded) => {
                    if (decoded.type === 3) {
                        const announcement = new Announcement({
                            title: req.body.title,
                            content: req.body.content,
                            announcer_id: decoded.id,
                            type: 'SPannouncement',

                        }).save((err, announcement) => {
                            if (err) {
                                res.status(500).json({
                                    status: 'error',
                                    message: err.message,
                                });
                            } else {
                                res.status(200).json({
                                    status: 'success',
                                    data: {
                                        announcement,
                                    },
                                });
                            }
                        });
                    } else {
                        res.status(500).json({
                            err: err.message,
                        });
                    }
                });
            }
        },
        viewStudentsFinishedOffer(req, res) {
            const token = req.headers['jwt-token'];
            jwt.verify(token, (decoded) => {
                if (decoded.type === 3) {
                    Offer.find({
                        sp_id: decoded.id,
                        end_date: { $lt: Date.Now },
                    }, (err, offers) => {
                        Reservation.find({
                            offer_id: { $in: offers.offer_id },
                        }, (err, reservations) => {
                            User.find({
                                id: { $in: reservations.user_id },
                            }, (err, students) => {
                                if (err) {
                                    res.status(500).json({
                                        status: 'error',
                                        message: err.message,
                                    });
                                } else {
                                    res.status(200).json({
                                        status: 'success',
                                        data: {
                                            students,
                                        },
                                    });
                                }
                            });
                        });
                    });
                } else {
                    res.status(500).json({
                        err: err.message,
                    });
                }
            });
        },
        viewReviews(req, res) {
            const token = req.headers['jwt-token'];
            jwt.verify(token, (decoded) => {
                if (decoded.type === 3) {
                    Review.find({ sp_id: decoded.id }).populate('reviewer_id').populate('sp_id').populate('comments').exec((err, reviews) => {
                        Comment.populate(reviews.comments, { path: 'commenter_id' }, (err, data) => {
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
                            }
                        });
                    });
                } else {
                    res.status(500).json({
                        err: err.message,
                    });
                }
            });
        },
        viewInterests(req, res) { // all interests
            const token = req.headers['jwt-token'];
            jwt.verify(token, (decoded) => {
                if (decoded.type === 3) {
                    const interests = Interest.find({}, (err, interests) => {
                        if (err) {
                            res.status(500).json({
                                status: 'error',
                                message: err.message,
                            });
                        } else {
                            res.status(200).json({
                                status: 'success',
                                data: {
                                    interests,
                                },
                            });
                        }
                    });
                } else {
                    res.status(500).json({
                        err: err.message,
                    });
                }
            });
        },
        assessStudent(req, res) {
            req.checkBody('rating', 'Rating is required').notEmpty();
            req.checkBody('rating').isNumber();


            var errors = req.validationErrors();

            if (errors) {
                res.status(400).json({
                    err: errors

                });
            } else {
                const token = req.headers['jwt-token'];
                jwt.verify(token, (decoded) => {
                    if (decoded.type === 3) {
                        const assessment = new Assessment({
                            sp_id: decoded.id,
                            user_id: req.params.id,
                            rating: req.body.rating,
                        }).save((err, assessment) => {
                            if (err) {
                                res.status(500).json({
                                    status: 'error',
                                    message: err.message,
                                });
                            } else {
                                res.status(200).json({
                                    obj: assessment,
                                });
                            }
                        });
                    } else {
                        res.status(200).json({
                            status: 'success',
                            data: {
                                assessment,
                            },
                        });
                    }
                });
            }
        },
        getAllSPProfiles(req, res) { // viewing a summary of all SP profiles
            // const token = req.headers['jwt-token'];
            // jwt.verify(token, (decoded) => {
            SP.find({}).populate('user_id').exec((err, users) => {
                if (err) {
                    res.status(500).json({
                        status: 'error',
                        message: err.message,
                    });
                } else {
                    res.status(200).json({
                        status: 'success',
                        data: {
                            message: 'summary of SP profiles retrieved successfully',
                            users,
                        },
                    });
                }
                // });
            });
        },

        getSPProfile(req, res) { // viewing a specific SP profile
            const query = {
                _id: req.params.id, // Recently Changed to Params
            };

            SP.findOne(query, (err, providerProfile) => {
                User.findOne({ _id: providerProfile.user_id }, (err, user) => {
                    console.log(providerProfile);
                    console.log(user);

                    if (err) {
                        res.status(500).json({
                            status: 'error',
                            message: err.message,
                        });
                    } else {
                        res.status(200).json({
                            status: 'success',
                            data: {
                                providerProfile,
                                user,
                            },
                        });
                    }
                });
            });
        },

        // method used to add a video to the database
        addVideoByURL(req, res) {
            req.checkBody('title', 'Title is required').notEmpty();
            req.checkBody('videoURL', 'A Video Url is required').notEmpty();
            req.checkBody('videoURL', 'Please Enter a correct Url').isUrl();

            var errors = req.validationErrors();

            if (errors) {
                res.status(400).json({
                    err: errors

                });
            } else {
                const token = req.headers['jwt-token'];
                jwt.verify(token, (decoded) => {
                    if (decoded.type === 3) {
                        const user_id = decoded.id;
                        const title = req.body.title;
                        const url = req.body.videoURL;
                        // creating the new video instance in the database
                        const newVideo = new Video({
                            user_id,
                            title,
                            url,

                        });
                        newVideo.save((err, video) => {
                            if (err) {
                                res.status(500).json({
                                    status: 'error',
                                    message: err,
                                });
                            } else {
                                res.status(200).json({
                                    status: 'success',
                                    data: video.url,
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


        // getting the embeded video object for the front end to embed it
        getVideo(req, res) {
            const query = {
                user_id: req.params.id, // Recently Changed to Params
            };

            Video.find(query).populate('user_id').exec((err, story) => {
                if (err) {
                    res.status(500).json({
                        status: 'error',
                        message: err.message,
                    });
                } else {
                    res.status(200).json({
                        status: 'success',
                        data: {
                            video,
                        },
                    });
                }
            });
        },
        editSP(req, res) { // SP edits his profile

            // req.checkBody('price_category', 'Price Category is required').notEmpty();
            // req.checkBody('location', 'Location is required').notEmpty();

            // req.checkBody('description', 'A Description is required').notEmpty();
            // req.checkBody('fields', 'A Date is required').notEmpty()

            // req.checkBody('phone_number', 'A Phone Number is required').notEmpty()
            




            // var errors = req.validationErrors();

            // if (errors) {
            //     res.status(400).json({
            //         err: errors

            //     });
            // } else {
            const token = req.headers['jwt-token'];
            jwt.verify(token, (decoded) => {
                if (decoded.type === 3) {
                    User.find({
                        id: decoded.id,
                    }, (err, user) => {
                        if (err) {
                            res.status(500).json({
                                status: 'error',
                                message: err.message,
                            });
                        } else {
                            SP.find({
                                user_id: decoded.id,
                            }, (err, sp) => {
                                if (err) {
                                    res.status(500).json({
                                        status: 'error',
                                        message: err.message,
                                    });
                                } else {
                                    const price_category = req.body.price_category;
                                    const location = req.body.location;
                                    const description = req.body.description;
                                    const fields = req.body.fields;
                                    const phone_number = req.body.phone_number;

                                    SP.update({
                                        user_id: decoded.id,
                                    }, {
                                        price_category,
                                        location,
                                        description,
                                        fields,
                                        phone_number,
                                    }, (err, sp1) => {
                                        if (err) {
                                            res.status(500).json({
                                                status: 'error',
                                                message: err.message,
                                            });
                                        } else {
                                            res.json({
                                                mssg: 'sp updated',
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
    ,
    viewProfile(req, res) { // viewing my SP profile
        const token = req.headers['jwt-token'];
        jwt.verify(token, (decoded) => {
            if (decoded.type === 3) {
                const query = {
                    user_id: decoded.id,
                };
                SP.findOne(query, (err, providerProfile) => {
                    if (err) {
                        res.status(500).json({
                            status: 'error',
                            message: err.message,
                        });
                    } else {
                        User.find({ _id: decoded.id }, (err, user) => {
                            res.status(200).json({
                                status: 'success',
                                data: {
                                    user,
                                    providerProfile,
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
    viewMyInterests(req, res) { // SPs interests
        const token = req.headers['jwt-token'];
        jwt.verify(token, (decoded) => {
            if (decoded.type === 3) {
                const interests = SP.find({
                    user_id: decoded.id,
                }, (err, sp) => {
                    if (err) {
                        res.status(500).json({
                            status: 'error',
                            message: err.message,
                        });
                    } else {
                        Interest.find({
                            name: {
                                $in: sp.fields,
                            },
                        }, (err, interests) => {
                            if (err) {
                                res.status(500).json({
                                    status: 'error',
                                    message: err.message,
                                });
                            } else {
                                res.status(200).json({
                                    status: 'success',
                                    data: {
                                        interests,
                                    },
                                });
                            }
                        });
                    }
                });
            } else {
                res.status(500).json({
                    err: err.message,
                });
            }
        });
    },

};

module.exports = spController;
