const Reservation = require('../models/Reservation');

const reservationController = {
  getReservations(req, res) {
    // returning customized reservations depending on the type of user requesting it
    const user = req.user;
    if (!user) {
      res.json('user is not logged in or session is not working');
    } else if (req.user.type === 2) {
      // if the user type is student , we return his/her reservations
       // if(true)
      const query = {
        user_id: req.user.id,
      };
      Reservation.find(query, (err, reservations) => {
         // finding all reservations made by this student
        if (err) {
          res.status(500).json({
            status: 'error',
            message: err.message,
          });
        } else {
          // res.render('viewReservations', {reservations:reservations});
          res.status(200).json({
            status: 'success',
            data: {
              reservations,
            },
          });
        }
      });
    } else if (req.user.type === 3) {
      // } else if(false){
      const query = {
        service_provider_id: req.user.id,
      };
      Reservation.find(query, (err, reservations) => { // finding all reservations made to this SP
        if (err) {
          res.status(500).json({
            status: 'error',
            message: err.message,
          });
        } else {
          // res.render('viewReservations', {reservations:reservations});
          res.status(200).json({
            status: 'success',
            data: {
              reservations,
            },
          });
        }
      });
    }
  },

};
module.exports = reservationController;
