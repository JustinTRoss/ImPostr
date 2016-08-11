// We want user stuff to go in user ??
const UserRouter = require('express').Router();
const UserCtrl = require('./user.controller');

UserRouter.get('/checkJWT', passport.authenticate('jwt', {session: false}), UserCtrl.checkJWT);

UserRouter.post('/login', UserCtrl.userLogin);

UserRouter.post('/signup', UserCtrl.userSignup);

UserRouter.post('/logout', UserCtrl.userLogout);

module.exports = UserRouter;
