const passport = require('passport');
const AuthRouter = require('express').Router();
const { saveLinkedInToken, saveFacebookToken, saveTwitterTokens } = require('./auth.controller');

AuthRouter.get('/linkedin', passport.authenticate('linkedin', { state: 'asodfijasoidfj' }));
AuthRouter.get('/linkedin/callback', saveLinkedInToken);

AuthRouter.get('/facebook', passport.authenticate('facebook', { state: 'asodfijasoidfj' }));
AuthRouter.get('/facebook/callback', saveFacebookToken);

AuthRouter.get('/twitter', passport.authenticate('twitter', { session: false }));
AuthRouter.get('/twitter/callback', passport.authenticate('twitter', { session: false }), saveTwitterTokens);

module.exports = AuthRouter;
