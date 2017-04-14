// Require Dependencies
const express = require('express');
// var router = require('./source/routes');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');

const DB_URI = 'mongodb://localhost:27017/portfolio';

const app = express();

app.use(cors({
  origin: 'http://localhost:8080',
}));

// Configure app
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/public`));

// Required for Passport
app.use(session({
  secret: 'ilovescotchscotchyscotchscotch',
  cookie: {
    maxAge: 60000,
  },
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./source/routes.js')(app, passport);
require('./source/config/passport')(passport);

app.get('/', (req, res) => {
  res.json('Homepage is here');
});


mongoose.connect(DB_URI);
// app.use(router);

// GlOBAL VARS
app.use((req, res, next) => {
  // res.locals.success_msg = req.flash('success_msg');
  // res.locals.error_msg = req.flash('error_msg');
  // res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  // res.locals.username = req.username;
  next();
});


// Start the server
app.listen(3000, () => {
  console.log('Magic happens on port 3000');
});
