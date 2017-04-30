// Require Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const indexRouter = require('../source/routes/index');
const adminRouter = require('../source/routes/admin');
const spRouter = require('../source/routes/sP');
const studentRouter = require('../source/routes/student');
const userRouter = require('../source/routes/user');
const User = require('../source/models/User');
const cors = require('cors');
const Video = require('../source/models/Video');

const app = express();

app.use(cors({
  origin: 'http://localhost:8080',
}));

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.'),
      root = namespace.shift(),
      formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

app.use('/api', indexRouter);
app.use('/api/admins', adminRouter);
app.use('/api/sPs', spRouter);
app.use('/api/students', studentRouter);
app.use('/api/users', userRouter);
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

// Testing
//
// new User({
//     email: 'admin@gmail.com',
//     type: 1,
//     is_deleted: false,
//     password: '1'
//   }).save()
// var newUser = new User({
//   email: "admin@hotmail.com",
//   type: 1,
//   is_deleted: false
// });
// newUser.password = "Admin1234";
// newUser.save(function(err, user) {
//   if (err)
//     console.log(err);
//   else
//     console.log(user);
// });


/* new ServiceProvider({
  user_id: '58f1fdfd69c86ecc6395cfcb'
}).save(function(err, user) {
  if (err) {
    console.log(err.message)
  } else {
    console.log(user);
  }
});*/

/* new ServiceProvider({
  user_id: '58f1ff8ba1f47cccd6e7adfb'
}).save(function(err, user) {
  if (err) {
    console.log(err.message)
  } else {
    console.log(user);
  }
});*/
//
/* new Review({
   rating: 10,
   sp_id: '58f1fdfd69c86ecc6395cfcb',
 }).save();

 new Review({
   rating: 8,
   sp_id: '58f1fdfd69c86ecc6395cfcb',
 }).save();
//
// new Review({
//   rating: 20,
//   sp_id: '58e11d35e7c4701649421877',
// }).save();
//
 new Reservation({
   user_id: "58f1fbaa4cb3e4cbb57a0bf1",
   service_provider_id: '58f1fdfd69c86ecc6395cfcb',
 }).save();

new Reservation({
   user_id: "58f1fbaa4cb3e4cbb57a0bf1",
   service_provider_id: '58f1ff8ba1f47cccd6e7adfb',
 }).save();
*/
//
// new Video({
//   title: "video1",
//   url: "NLZRYQMLDW4",
//   user_id: "58fa29e1ccad2ea1f1becfb5"
// }).save();

// Start the server
app.listen(3000, () => {
  console.log('Magic happens on port 3000');
});
