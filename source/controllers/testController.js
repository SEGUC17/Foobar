let User = require('../models/User');
let ServiceProvider = require('../models/ServiceProvider');
let Student = require('../models/Student');
let Review = require('../models/Review');

let testController = {
  getAllUsers: function(req, res) {
    User.find(function(err, users) {
      if (err)
        res.send(err.message);
      else {
        res.render('../public/views/e.ejs', {
          users
        });
        console.log(users);
      }

    })
  },
  createUser: function(req, res) {
    let user = new User();
    user.name = "william";
    user.email = 'ali.william2@gmail.com';
    user.password = 'football';
    user.type = 3;
    user.is_deleted = false;

    if (user.type == 2) {
      let student = new Student();
      student.user_id = user.id;

      student.save(function(err, student) {
        if (err)
          res.send(err.message);
        else {
          console.log(student);
        }
      })

    } else {
      if (user.type == 3) {
        let sp = new ServiceProvider();
        sp.user_id = user.id;
        sp.save(function(err, sp) {
          if (err)
            res.send(err.message);
          else {
            console.log(sp);
          }
        })
      }
    }


    user.save(function(err, user) {
      if (err)
        res.send(err.message);
      else {
        console.log(user);
      }
    })
  },
  createReview: function(req, res) {
    let review = new Review();
    review.rating = 4;
    review.reviewer_id = 1234;
    review.content = 'very good SP';
    review.sp_id = '58dd0f71affa495504e6248a';

    review.save(function(err, review) {
      if (err)
        res.send(err.message);
      else {
        console.log(review);
      }
    })
  }


}

module.exports = testController;
