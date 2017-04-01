let Offer = require("../models/Offer");

let offerController = {

  createOffer: function(req, res) { //posting new offer

    //making a new offer instance and saving it
    var newOffer = new Offer({
      title: req.body.title,
      price: req.body.price,
      sp_id: req.body.sp_id,
      field: req.body.field,
      description: req.body.description,
      due_date: req.body.due_date,
      start_date: req.body.start_date,
      end_date: req.body.end_date
    });

    newOffer.save();
    console.log('new offer posted successfully');

  }


};
module.exports = offerController;
