const express = require('express');
const router = express.Router();
const userController = require('../db/users/usercontroller');

router.post('/login', (req, res) => {
  console.log(req.body);
  console.log('/auth/login');
  userController.userLogin(req, res);
});

router.post('/signup', (req, res) => {
  console.log(req.body);
  console.log('/auth/signup');
  userController.userSignup(req, res);
});

router.post('/logout', (req, res) => {
  console.log(req.body, 'this should receive state');
  console.log('/auth/logout');
  res.json({
    message: 'loggedOut',
  });
});

module.exports = router;
