const passport = require('passport');
const AuthRouter = require('express').Router();
const AuthCtrl = require('./auth.controller');

AuthRouter.get('/linkedin', passport.authenticate('linkedin', { state: 'asodfijasoidfj' }));
AuthRouter.get('/linkedin/callback', AuthCtrl.saveLinkedInToken);

AuthRouter.get('/facebook', passport.authenticate('facebook', { state: 'asodfijasoidfj' }));
AuthRouter.get('/facebook/callback', AuthCtrl.saveFacebookToken);

AuthRouter.get('/twitter', passport.authenticate('twitter', { session: false }));
AuthRouter.get('/twitter/callback', passport.authenticate('twitter', { session: false }), AuthCtrl.saveTwitterTokens);

module.exports = AuthRouter;
