const Reservation = require('../models/Reservation');
const jwt = require('../auth/jwt');

const reservationController = {

  getReservations(req, res) {
    // returning customized reservations depending on the type of user requesting it
    const token = req.headers['jwt-token'];
    jwt.verify(token, (decoded) => {
      if (decoded.type === 2) { // if the user type is student , we return his/her reservations
        const query = {
          user_id: decoded.id,
        };

        Reservation.find(query).populate('user_id',{password:0}).populate('offer_id').populate('service_provider_id',{password:0}).exec((err, reservations) => {
          if (err) {
            res.status(500).json({
              status: 'error',
              message: err.message,
            });
          } else {
            res.status(200).json({
              status: 'success',
              data: {
                reservations,
              },
            });
          }
        });
      } else if (decoded.type === 3) {
        // } else if(false){
        const query = {
          service_provider_id: decoded.id,
        };

        Reservation.find(query).populate('user_id',{password:0}).populate('offer_id').populate('service_provider_id',{password:0}).exec((err, reservations) => {
          if (err) {
            res.status(500).json({
              status: 'error',
              message: err.message,
            });
          } else {
            res.status(200).json({
              status: 'success',
              data: {
                reservations,
              },
            });
          }
        });
      }
    });
  },
};
module.exports = reservationController;
