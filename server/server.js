const app = require('express')();

app.get('/login', (req, res) => {
  res.send({loggedIn: true})
})

app.get('/signup', (req, res) => {
  res.send(res.send({loggedIn: true}))
})

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
