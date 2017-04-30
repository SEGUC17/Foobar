const Offer = require('../models/Offer');
const jwt = require('../auth/jwt');


const offerController = {

    createOffer(req, res) { // posting new offer

        req.checkBody('title', 'Title is required').notEmpty();
        req.checkBody('price', 'Price is required').notEmpty();
        req.checkBody('price','Enter A Number in Price').isInt();
        req.checkBody('capacity', 'Capacity is required').notEmpty();
        req.checkBody('capacity','Enter A Number in Capacity').isInt();
        
        req.checkBody('due_date', 'DueDate is required').notEmpty()
        req.checkBody('due_date', 'DueDate is Wrong Date Format').isDate();
        req.checkBody('start_date', 'StartDate is required').notEmpty();
        req.checkBody('start_date', 'StartDate is Wrong Date Format').isDate();
        req.checkBody('end_date', 'EndDate is required').notEmpty();
        req.checkBody('end_date', 'EndDate is Wrong Date Format').isDate();
//var d = new Date();


        if(req.body.end_date<req.body.start_date || req.body.due_date>req.body.start_date ){
            res.status(500).json({
              
                data:{
                    err:'Weird, Dates not correctly choosen!'
                }
            })
        }
        else{

    

        var errors = req.validationErrors();

        if (errors) {
            res.status(400).json({
                err: errors

            });
        } else {
            const token = req.headers['jwt-token'];
            jwt.verify(token, (decoded) => {
                if (decoded.type === 3 && decoded.is_blocked===false) {
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

        }
        }
    },
    
};


module.exports = offerController;
