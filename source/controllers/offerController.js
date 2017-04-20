const Offer = require('../models/Offer');
const jwt = require('../auth/jwt');


const offerController = {

    createOffer(req, res) { // posting new offer

        req.checkBody('title', 'Title is required').notEmpty();
        req.checkBody('price', 'A Price is required').notEmpty();
        req.checkBody('capacity', 'Capacity is required').notEmpty();
        req.checkBody('price').isInt();
        req.checkBody('capacity').isInt();
       
        req.checkBody('description', 'A Description is required').notEmpty();
        req.checkBody('due_date', 'A Date is required').notEmpty()
        req.checkBody('start_date', 'A Date is required').notEmpty()
        req.checkBody('end_date', 'A Date is required').notEmpty()
        req.checkBody('due_date', 'Wrong Date Format').isDate();
        req.checkBody('start_date', 'Wrong Date Format').isDate();
        req.checkBody('end_date', 'Wrong Date Format').isDate();



        var errors = req.validationErrors();

        if (errors) {
            res.status(400).json({
                err: errors

            });
        } else {
            const token = req.headers['jwt-token'];
            jwt.verify(token, (decoded) => {
                if (decoded.type === 3) {
                    // making a new offer instance and saving it
                    const newOffer = new Offer({
                        // updated
                        title: req.body.title,
                        price: req.body.price,
                        sp_id: req.body.id,
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

        }
    },
};


module.exports = offerController;
