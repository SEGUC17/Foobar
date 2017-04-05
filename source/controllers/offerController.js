let Offer = require("../models/Offer");

let offerController = {

  createOffer: function(req, res) { //posting new offer
    const user = req.user;
    //making a new offer instance and saving it
    var newOffer = new Offer({
      //updated
      title: req.body.title,
      price: req.body.price,
      sp_id: user.id,
      field: req.body.field,
      capacity: req.body.capacity,
      description: req.body.description,
      due_date: req.body.due_date,
      start_date: req.body.start_date,
      end_date: req.body.end_date
    });
    newOffer.save();
    res.json(newOffer.capacity);
    console.log('new offer posted successfully');

  }


};
module.exports = offerController;
