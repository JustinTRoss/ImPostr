const UserRouter = require('express').Router();
const passport = require('passport');
const {
  checkJWT,
  userLogin,
  userSignup,
} = require('./user.controller');

UserRouter.get('/checkJWT', passport.authenticate('jwt', { session: false }), checkJWT);

UserRouter.post('/login', userLogin);

UserRouter.post('/signup', userSignup);

module.exports = UserRouter;
