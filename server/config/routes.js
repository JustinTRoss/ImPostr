const SettingsRouter = require('../settings/setting.routes');
const PostRouter = require('../posts/post.routes');
const UserRouter = require('../users/user.routes');
const passport = require('passport');

module.exports = (app, config) => {
  app.use('/settings', passport.authenticate('jwt', {session: false}), SettingsRouter);
  app.use('/post', passport.authenticate('jwt', {session: false}), PostRouter);
  app.use('/user', UserRouter);

  // app.get('/*', (req, res) => {
  //   res.sendFile(config.rootPath + '/client/index.html');
  // });
};
