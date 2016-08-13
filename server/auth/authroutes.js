const passport = require('passport');
const AuthRouter = require('express').Router();
const fetch = require('isomorphic-fetch');

// AuthRouter.get('/linkedin', passport.authenticate('jwt', { session: false }), (req, res) => {
//   passport.authenticate('linkedin', { state: 'asodfijasoidfj' })
//   console.log(req.user);
//   res.json(req.user);
// }
// );

AuthRouter.get('/linkedin', passport.authenticate('linkedin', { state: 'asodfijasoidfj' }), () => {/**/});

AuthRouter.get('/linkedin/callback', (req, res) => {
  console.log('called?');
  console.log(req.query.code, 'code from linkedin');
  console.log(req.query.state, 'state from linkedin');
  res.redirect('/');
});

module.exports = AuthRouter;
