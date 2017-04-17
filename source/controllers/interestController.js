let Interest = require("../models/Interests");
const jwt = require('../auth/jwt');


let interestController = {

  //adding to interests options of the system
  addInterest: function(req, res) {
    const token = req.headers['jwt-token'];
    jwt.verify(token, function(decoded) {
      // if (decoded.type === 1) {
        var name = req.body.name;

        //creating a new Interests instance and saving it
        var newInterest = new Interest({
          name: name
        });
        newInterest.save();
        res.status(200).json({
          status: 'success',
          data: {
            name,
          },
        });

      // } else {
      //   res.status(500).json({
      //     err: 'unauthorized access'
      //   });
      // }
    });
  }
}
module.exports = interestController;
