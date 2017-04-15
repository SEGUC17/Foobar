let Review = require("../models/Review");
const jwt = require('../auth/jwt');


let reviewController = {


  deleteReview: function(req, res) { //deleting the requested review
    const token = req.headers['jwt-token'];
    jwt.verify(token, function(decoded) {
      if (decoded.type == 1) {
        var review_id = req.body.id;
        Review.findByIdAndRemove(review_id, function(err, review) {
          if (err)
            res.status(500).json({
              err: err.message
            });
          else {
            res.status(200).json("Deleted this review: " + review);
          }
        });
      } else {
        res.status(500).json({
          mssg: "Unauthorized action to this type of user"
        });
      }
    });
  }

};

module.exports = reviewController;
