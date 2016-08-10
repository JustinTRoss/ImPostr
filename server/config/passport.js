const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJWT;
const User = require('../users/user.model');
const config = require('./config');

passport.use(new JWTStrategy(
  {
    secretOrKey: config.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
  }, (jwtPayload, done) => {
    User.findOne({where: { userid : jwtPayload.userid }})
      .then(user => {
        done(null, user);
      })
      .catch(done);
  }
));