const app = require('express')();
const parser = require('body-parser');
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(parser.json());

app.get('/login', (req, res) => {
  res.json({ loggedIn: true });
});

app.get('/signup', (req, res) => {
  res.json();
});

app.post('/logout', (req, res) => {
  console.log(req.body, 'this should receive state');
  res.json({
    message: 'loggedOut',
  });
});

app.get('/platformLogin', (req, res) => {
  const platform = req.body.platform;
  let response;
  if (req.body.platform === 'facebook') {
    response = {status: 'fb logged in'}
  } else if (req.body.platform === 'linkedin') {
    response = {status: 'li logged in'}
  } else if (req.body.platform === 'twitter') {
    response = {status: 'tw logged in'}
  }
  res.send(response)
})

app.get('/platformLogout', (req, res) => {
  const platform = req.body.platform;
  let response;
  if (req.body.platform === 'facebook') {
    response = {status: 'fb logged out'}
  } else if (req.body.platform === 'linkedin') {
    response = {status: 'li logged out'}
  } else if (req.body.platform === 'twitter') {
    response = {status: 'tw logged out'}
  }
  res.send(response)
})

app.put('/toggleAutopilot', (req, res) => {
  let response;
  if (req.body.platform === 'facebook') {
    response = {autoPilot: 'fb toggled'}
  } else if (req.body.platform === 'linkedin') {
    response = {autoPilot: 'li toggled'}
  } else if (req.body.platform === 'twitter') {
    response = {autoPilot: 'tw toggled'}
  }
  res.send(response)
})

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

app.listen(3000, () => {
  console.log('Listening on 3000');
});
