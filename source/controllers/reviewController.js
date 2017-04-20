const Review = require('../models/Review');
const jwt = require('../auth/jwt');


const reviewController = {


    deleteReview(req, res) { // deleting the requested review
        req.checkBody('id', 'ID is required').notEmpty();


        var errors = req.validationErrors();

        if (errors) {
            res.status(400).json({
                err: errors

            });
        } else {
            const token = req.headers['jwt-token'];
            jwt.verify(token, (decoded) => {
                if (decoded.type === 1) {
                    const review_id = req.body.id;
                    Review.findByIdAndRemove(review_id, (err, review) => {
                        if (err) {
                            res.status(500).json({
                                status: 'error',
                                message: err.message,
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
                } else {
                    res.status(500).json({
                        mssg: 'Unauthorized action to this type of user',
                    });
                }
            });
        }
    },

};

module.exports = reviewController;
