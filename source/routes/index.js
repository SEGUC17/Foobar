const express = require('express');

const router = express.Router();
const stripe = require('stripe')('sk_test_TPfHR1k3VAZJmUVbUkFQojfB');
const announcementController = require('../controllers/announcementController');
const homeController = require('../controllers/homeController');
const path = require('path');
const multer = require('multer');
const crypto = require('crypto');
const Reservation = require('../models/Reservation');
const Offer = require('../models/Offer');

const storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename(req, file, cb) {
    crypto.pseudoRandomBytes(16, (err, raw) => {
      if (err) return cb(err);
      cb(null, raw.toString('hex') + path.extname(file.originalname));
    });
  },
});

const upload = multer({ storage });

// redirecting homepage
router.get('/', (req, res) => {
  res.render('index');
});

router.post('/testupload', upload.single('profile_img'), (req, res) => {
  console.log(req.file);
});

router.get('/announcements/view', announcementController.getAllAnnouncements); // viewing announcements
router.post('/resetPW', homeController.resetPassword); // resetting password

router.post('/charge', (req, res) => {
  console.log('paying');
  const token_id = req.body.token_id;
  const purchase_price = req.body.price;

  const charge = stripe.charges.create({
    amount: purchase_price, // Amount in cents
    currency: 'usd',
    source: token_id,
    description: 'Example charge',
  }, (err, response) => {
    if (err && err.type === 'StripeCardError') {
      // The card has been declined
      res.json({ status: 'failure', reason: 'card was declined' });
    } else {
      console.log(charge);
      res.json({ status: 'success', response });
    }
  });
});

router.post('/refund', (req, res) => {
  stripe.refunds.create({
    charge: req.body.charge_id,
  }, function(err, refund) {
    res.json({ status: 'success', refund});
  });
});

router.post('/changeStatus', (req, res) => {
  console.log(req.body);
  Reservation.findOneAndUpdate(
    { "_id" : req.body.id },
    { $set: { "status" : 3}}, function(err, found){
       Offer.findOneAndUpdate(
        { "_id" : found.id },
        { $inc: { "capacity" : 1}}, function(offererr, offer){
          res.json({ status: 'success'});
       })
    })
});

module.exports = router;
