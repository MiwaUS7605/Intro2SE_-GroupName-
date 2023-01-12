const passport = require('passport');
const LocalStrategy = require('passport-local');
const authService = require('../AuthService');

passport.use(new LocalStrategy({ usernameField: 'email' }, async function verify(username, password, cb) {
  const user = await authService.checkUserCredential(username, password);
  if (user)
    return cb(null, user);
  return cb(null, false);
}));

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.idaccount, name: user.name, email: user.email, password: user.password, address: user.address, phonenumber: user.phonenumber, role: user.role});
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

module.exports = passport;