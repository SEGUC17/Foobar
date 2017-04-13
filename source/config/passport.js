const LocalStrategy = require('passport-local').Strategy;

// Requirements
const User = require('../models/User');
const Student = require('../models/Student');
const StudentInterest = require('../models/StudentInterest');


// expose this function to our app using module.exports
module.exports = function (passport) {
  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });


  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-signup', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true, // allows us to pass back the entire request to the callback
  },

    (req, email, password, done) => {
      console.log('file:', req.file);
      console.log('body:', req.body);
      // asynchronous
      // User.findOne wont fire unless data is sent back
      process.nextTick(() => {
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({
          'local.email': email,
        }, (err, user) => {
          // if there are any errors, return the error
          if (err) { return done(err); }

          // check to see if theres already a user with that email
          if (user) {
            return done(null, false, { message: 'That email is already taken.' });
          }
            // if there is no user with that email
            // create the user
          const newUser = new User();

            // set the user's local credentials
          newUser.name = req.body.name;

          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(
              password);
          newUser.type = 2;

          const newStudent = new Student({
            user_id: newUser.id,
            university: req.body.university,
            address: req.body.address,
            birthdate: req.body.birthdate,
            description: req.body.description,
            is_deleted: false,
          });

          // Porfile Image
          if (req.file) {
            newUser.profileimg.name = req.file.filename;
            newUser.profileimg.path = req.file.path;
            newUser.profileimg.size = req.file.size;
          }

          const interests = req.body.interests;
          if (interests) {
            for (let i = 0; i < interests.length; i += 1) {
              const newInterset = new StudentInterest({
                student_id: newUser.id,
                interest_id: interests[i],
              });
              newInterset.save((newInteresterr) => {
                if (newInteresterr) {
                  console.log('Student Interest saving error');
                  return newInteresterr;
                }
                return undefined;
              });
            }
          }
            // save the user
          newUser.save((newUserErr) => {
            if (newUserErr) { throw newUserErr; } else {
              newStudent.save((newStudentErr) => {
                if (newStudentErr) { throw newStudentErr; }
                return done(null, newUser);
              });
            }
          });
          return undefined;
        });
      });
    }));
  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-login', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true, // allows us to pass back the entire request to the callback
  },

    (req, email, password, done) => { // callback with email and password from our form
      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      User.findOne({
        'local.email': email,
      }, (err, user) => {
        // if there are any errors, return the error before anything else
        if (err) { return done(err); }

        // if no user is found, return the message
        if (!user) { return done(null, false, { message: 'User is not found' }); } // req.flash is the way to set flashdata using connect-flash

        // if the user is found but the password is wrong
        if (!user.validPassword(password)) { return done(null, false, { message: 'Oops, incorrect password' }); } // create the loginMessage and save it to session as flashdata

        // all is well, return successful user
        return done(null, user);
      });
    }));
};
