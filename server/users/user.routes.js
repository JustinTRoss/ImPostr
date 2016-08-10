// We want user stuff to go in user ??
const UserRouter = require('express').Router();
const UserCtrl = require('./user.controller');

UserRouter.post('/login', (req, res) => {
  console.log(req.body);
  console.log('/user/login');
  UserCtrl.userLogin(req, res);
});

UserRouter.post('/signup', (req, res) => {
  console.log(req.body);
  console.log('/user/signup');
  UserCtrl.userSignup(req, res);
});

UserRouter.post('/logout', (req, res) => {
  console.log(req.body, 'this should receive state');
  console.log('/user/logout');
  res.json({
    message: 'loggedOut',
  });
});

module.exports = UserRouter;
