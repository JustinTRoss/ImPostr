const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../users/user.model');
const TwitterStrategy = require('passport-twitter').Strategy;
const config = require('./config');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const {
  LINKEDIN_KEY,
  LINKEDIN_SECRET,
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
} = require('../../__cutestuff');

passport.use(new JwtStrategy(
  {
    secretOrKey: config.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
  }, (jwtPayload, done) => {
    User.findOne({ where: { userId: jwtPayload.userId } })
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

passport.use(new LinkedInStrategy({
  clientID: LINKEDIN_KEY,
  clientSecret: LINKEDIN_SECRET,
  callbackURL: '/auth/linkedin/callback',
  scope: ['r_emailaddress', 'r_basicprofile', 'w_share'],
}, (...args) => {
  process.nextTick((accessToken, refreshToken, profile, done) => {
  });
}
));

passport.use(new TwitterStrategy(
  {
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: '/auth/twitter/callback',
  }, (token, tokenSecret, profile, done) => {
    const userTwitterInfo = {
      token,
      tokenSecret,
      profile,
    };
    done(null, userTwitterInfo);
  }
));


passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: '/auth/facebook/callback',
}, (accessToken, refreshToken, profile, cb) => {
  cb(accessToken, refreshToken, profile);
}
));
