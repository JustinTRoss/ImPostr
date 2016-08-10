// We want auth stuff to go in user ??
const AuthRouter = require('express').Router();
const UserCtrl = require('./user.controller');

AuthRouter.post('/login', (req, res) => {
  console.log(req.body);
  console.log('/auth/login');
  UserCtrl.userLogin(req, res);
});

AuthRouter.post('/signup', (req, res) => {
  console.log(req.body);
  console.log('/auth/signup');
  UserCtrl.userSignup(req, res);
});

AuthRouter.post('/logout', (req, res) => {
  console.log(req.body, 'this should receive state');
  console.log('/auth/logout');
  res.json({
    message: 'loggedOut',
  });
});

module.exports = AuthRouter;
