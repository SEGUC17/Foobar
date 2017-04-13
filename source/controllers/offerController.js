const Offer = require('../models/Offer');

const offerController = {

  createOffer(req, res) { // posting new offer
    const user = req.user;
    // making a new offer instance and saving it
    const newOffer = new Offer({
      title: req.body.title,
      price: req.body.price,
      sp_id: user.id,
      field: req.body.field,
      capacity: req.body.capacity,
      description: req.body.description,
      due_date: req.body.due_date,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
    });
    newOffer.save((err) => {
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
        newOffer,
      },
    });
  },


};
module.exports = offerController;
