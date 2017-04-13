const Interests = require('../models/Interests');

const interestController = {

  // adding to interests options of the system
  addInterest(req, res) {
    const name = req.body.name;
    // creating a new Interests instance and saving it
    const newInterest = new Interests({
      name,
    });
    newInterest.save((err) => {
      if (err) {
        res.status(500).json({
          status: 'error',
          message: err.message,
        });
      }
    });
    res.status(200).json({
      status: 'success',
      data: {
        name,
      },
    });
  },

};
module.exports = interestController;
