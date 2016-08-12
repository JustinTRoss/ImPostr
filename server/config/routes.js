const SettingsRouter = require('../settings/setting.routes');
const PostRouter = require('../posts/post.routes');
const UserRouter = require('../users/user.routes');
const passport = require('passport');
const secretState = require('./config');
console.log(secretState);

module.exports = (app, config) => {
  app.use('/settings', passport.authenticate('jwt', {session: false}), SettingsRouter);
  app.use('/post', passport.authenticate('jwt', {session: false}), PostRouter);
  app.use('/user', UserRouter);

  // --- leave me alone for now (Steven)
  app.get('/auth/linkedin',
    passport.authenticate('linkedin', { state: 'oasidfjoaisdjf' }),
    (req, res) => { /*will not be called since redirect to linkedIn*/}
  );

  app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

  // app.get('/*', (req, res) => {
  //   res.sendFile(config.rootPath + '/client/index.html');
  // });
};
