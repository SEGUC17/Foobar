let Reservation = require("../models/Reservation");
let reservationController = {

  getReservations: function(req, res) { //returning customized reservations depending on the type of user requesting it

    if (req.user.type == 2) //if the user type is student , we return his/her reservations
    {
      let query = {
        user_id: req.user.id
      };
      Reservation.find(query, function(err, reservations) { //finding all reservations made by this student

        if (err) {
          res.send(err.message);

          console.log("error");
        } else {
          //res.render('viewReservations', {reservations:reservations});
          console.log('reservations retrieved succesfully');
        }
      });
    } else if (req.user.type == 3) {
      let query = {
        sp_id: req.user.id
      };
      Reservation.find(query, function(err, reservations) { //finding all reservations made to this SP

        if (err) {
          res.send(err.message);

          console.log("error");
        } else {
          //res.render('viewReservations', {reservations:reservations});
          console.log('reservations retrieved successfully');
        }
      });
    }
  }

};
module.exports = reservationController;
