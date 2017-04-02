const express = require('express');
const router = express.Router();

//redirecting homepage
router.get('/', function(req, res) {
  // res.render('index');
  console.log('homepage is here');
  res.json({
    hello: 'world'
  })
});

module.exports = router;
