// expose our config directly to our application using module.exports
module.exports = {
  'facebookAuth': {
    'clientID': '367750226958271', // your App ID
    'clientSecret': '3673d851f977381ca8f77eec88cab3c0', // your App Secret
    'callbackURL': 'http://localhost:3000/auth/facebook/callback',
    'profileFields': ['emails']
  },

};
