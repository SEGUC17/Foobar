const Offer = require('../models/Offer');
const jwt = require('../auth/jwt');


const offerController = {

  createOffer(req, res) { // posting new offer
    const token = req.headers['jwt-token'];
    jwt.verify(token, (decoded) => {
      if (decoded.type === 3) {
        // making a new offer instance and saving it
        const newOffer = new Offer({
          // updated
          title: req.body.title,
          price: req.body.price,
          sp_id: decoded.id,
          field: req.body.field,
          capacity: req.body.capacity,
          description: req.body.description,
          due_date: req.body.due_date,
          start_date: req.body.start_date,
          end_date: req.body.end_date,
        });
        newOffer.save();
        res.status(200).json({
          status: 'success',
          data: {
            newOffer,
          },
        });
      } else {
        res.status(500).json({
          err: 'unauthorized access',
        });
      }
    });
  },
};


module.exports = offerController;
