let Review = require("../models/Review");

let reviewController = {


  deleteReview: function(req, res) { //deleting the requested review
    var review_id = req.body.id;
    Review.findByIdAndRemove(review_id, function(err) {
      if (err)
        res.send(err);
      else
        console.log('review deleted');

    });
  }

};

module.exports = reviewController;
