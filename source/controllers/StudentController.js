let Student = require('.. / models / Student');
let Review = require('.. / models / Review');
let ServiceProvider = require('../models/ServiceProvider');

let StudentController = {
  add_review: function(req, res) {
    review = new Review(req.body);
    review.reviewer_id = req.user.id;
    // review.sp_id =

    review.save(function(err, review) {
      if (err)
        res.send(err.message);
      else {
        console.log(review);
      }
    })

  }



}
