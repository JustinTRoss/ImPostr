const SettingsRouter = require('../settings/setting.routes');
const PostRouter = require('../posts/post.routes');
const UserRouter = require('../users/user.routes');
const AuthRouter = require('../auth/authroutes');
// const TwitterRouter = require('../../apiServers/TwitterApi/auth.routes');
const passport = require('passport');
const config = require('./config');

module.exports = (app, config) => {
  app.use('/settings', passport.authenticate('jwt', {session: false}), SettingsRouter);
  app.use('/post', passport.authenticate('jwt', {session: false}), PostRouter);
  app.use('/user', UserRouter);
  app.use('/auth', AuthRouter);
  app.use('/auth/twitter', passport.authenticate('twitter',{session: false}), (req, res) => {
    res.json({
      user: res.user,
    });
  });
  app.get('/auth/twitter/callback', passport.authenticate('twitter', {session: false}),
    function(req, res) {
      // Successful authentication, redirect home.
      res.send('test');
  });

  // app.get('/*', (req, res) => {
  //   res.sendFile(config.rootPath + '/client/index.html');
  // });
};
