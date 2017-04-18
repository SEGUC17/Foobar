const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_TPfHR1k3VAZJmUVbUkFQojfB');
const announcementController = require('../controllers/announcementController');


// redirecting homepage
router.get('/', (req, res) => {
  res.render('index');
});

router.get('/announcements/view', announcementController.getAllAnnouncements); //viewing announcements

router.post('/charge', (req, res) => {
  console.log("paying");
  const token_id = req.body.token_id;
  const purchase_price = req.body.price;

  // console.log(token.id +"\n"+purchase_price);

  const charge = stripe.charges.create({
    amount: purchase_price, // Amount in cents
    currency: 'usd',
    source: token_id,
    description: 'Example charge',
  }, (err, charge) => {
    if (err && err.type === 'StripeCardError') {
      // The card has been declined
      res.json({ status: 'failure', reason: 'card was declined' });
    } else {
      console.log(charge);
      res.json({ status: 'success' });
    }
  });
});

module.exports = router;
