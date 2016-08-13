const TwitterRouter = require('express').Router();
const twitterAuth = require('./auth.controller');

// TwitterRouter.get('/connect', twitterAuth.connect);
// TwitterRouter.get('/callback', twitterAuth.auth);
// TwitterRouter.get('/logout', twitterAuth.logout);

module.exports = TwitterRouter;

// Direct users to /twitter/connect to initiate oauth flow.