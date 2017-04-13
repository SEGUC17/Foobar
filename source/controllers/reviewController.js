const Review = require('../models/Review');

const reviewController = {
  deleteReview(req, res) { // deleting the requested review
    const reviewId = req.body.id;
    Review.findByIdAndRemove(reviewId, (err) => {
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
  },
};

module.exports = reviewController;
