const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../users/user.model');
const config = require('./config');

passport.use(new JwtStrategy(
  {
    secretOrKey: config.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
  }, (jwtPayload, done) => {
    User.findOne({ where: { userId: jwtPayload.userId }})
    .then(user => {
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
    .catch(done);
  }
));