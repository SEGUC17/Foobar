const Interests = require('../models/Interests');
const jwt = require('../auth/jwt');


const interestController = {

  // adding to interests options of the system
  addInterest(req, res) {

      req.checkBody('name', 'Name is required').notEmpty();



      var errors = req.validationErrors();

      if (errors) {
        res.status(400).json({
          err: errors

        });
      } else {
        const token = req.headers['jwt-token'];
        jwt.verify(token, (decoded) => {
          if (decoded.type === 1) {
            const name = req.body.name;

            // creating a new Interests instance and saving it
            const newInterest = new Interests({
              name,
            });
            newInterest.save();
            res.status(200).json({
              status: 'success',
              data: {
                name,
              },
            });
          } else {
            res.status(500).json({
              err: 'unauthorized access',
            });
          }
        });
      }
    },
    findAllInterests(req, res) { // viewing all Interests

      Interests.find((err, interests) => {
        if (err) { // if error occurred
          res.status(500).json({
            status: 'error',
            message: err.message,
          });
        } else {
          ////console.log(interests);
          res.status(200).json({
            status: 'success',
            data: {
              interests,
            },
          });
        }
      });
    }


};
module.exports = interestController;
