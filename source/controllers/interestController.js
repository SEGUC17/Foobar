let Interests = require("../models/Interests");

let interestController = {

  //adding to interests options of the system
  addInterest: function(req, res) {
    var name = req.body.name;

    //creating a new Interests instance and saving it
    var newInterest = new Interests({
      name: name
    });
    newInterest.save();
    res.json(name);
  }

};
module.exports = interestController;
