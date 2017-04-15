let Reservation = require("../models/Reservation");
const jwt = require('../auth/jwt');

let reservationController = {

  getReservations: function(req, res) { //returning customized reservations depending on the type of user requesting it
    const token = req.headers['jwt-token'];
    jwt.verify(token, function(decoded) {
      if (decoded.type == 2) //if the user type is student , we return his/her reservations
      {
        let query = {
          user_id: decoded.id
            //  user_id: "1111"
        };
        Reservation.find(query, function(err, reservations) { //finding all reservations made by this student

          if (err) {
            res.json(err.message);

            console.log("error");
          } else {
            //res.render('viewReservations', {reservations:reservations});
            console.log('reservations retrieved succesfully');
            res.json(reservations);
          }
        });
      } else if (decoded.type == 3) {
        // } else if(false){
        let query = {
          service_provider_id: decoded.id
        };
        Reservation.find(query, function(err, reservations) { //finding all reservations made to this SP

          if (err) {
            res.json(err.message);

            console.log("error");
          } else {
            //res.render('viewReservations', {reservations:reservations});
            console.log('reservations retrieved successfully');
            res.json(reservations);
          }
        });
      }

    });

  }
}
module.exports = reservationController;
