// Require Dependencies

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const indexRouter = require('./source/routes/index');
const adminRouter = require('./source/routes/admin');
const spRouter = require('./source/routes/sP');
const studentRouter = require('./source/routes/student');
const userRouter = require('./source/routes/user');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

app.use('/api/', indexRouter);
app.use('/api/admins/', adminRouter);
app.use('/api/sPs/', spRouter);
app.use('/api/students/', studentRouter);
app.use('/api/users/', userRouter);
app.use(express.static('public'));

// Configure app
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

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

const DB_URI = 'mongodb://localhost:27017/portfolio';
mongoose.connect(DB_URI);
// app.use(indexRouter);

// GlOBAL VARS
// app.use(function(req, res, next) {
//   // res.locals.success_msg = req.flash('success_msg');
//   // res.locals.error_msg = req.flash('error_msg');
//   // res.locals.error = req.flash('error');
//   res.locals.user = req.user || null;
//   // res.locals.username = req.username;
//   next();
// });

// Start the server
app.listen(3000, function() {
  console.log('Magic happens on port 3000');
});
