const passport = require('passport');
const AuthRouter = require('express').Router();
const AuthController = require('./authcontroller');

AuthRouter.get('/linkedin', passport.authenticate('linkedin', { state: 'asodfijasoidfj' }), () => {/**/});

AuthRouter.get('/linkedin/callback', AuthController.saveLinkedInToken);

module.exports = AuthRouter;
