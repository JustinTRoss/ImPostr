const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  console.log(req.body);
  console.log('/auth/login');
  res.json({
    loggedIn: true,
  });
});

router.post('/signup', (req, res) => {
  console.log(req.body);
  console.log('/auth/signup');
  res.json({
    loggedIn: true,
  });
});

router.post('/logout', (req, res) => {
  console.log(req.body, 'this should receive state');
  console.log('/auth/logout');
  res.json({
    message: 'loggedOut',
  });
});

module.exports = router;
/*


app.put('/updateSettings', (req, res) => {
  let response;
  if (req.body.platform === 'facebook') {
    response = {settings: 'fb settings updated'}
  } else if (req.body.platform === 'linkedin') {
    response = {settings: 'li settings updated'}
  } else if (req.body.platform === 'twitter') {
    response = {settings: 'tw settings updated'}
  }
  res.send(response)
})

*/
