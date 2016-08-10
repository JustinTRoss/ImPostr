const SettingsRouter = require('../settings/setting.routes');
const PostRouter = require('../posts/post.routes');
const UserRouter = require('../users/user.routes');

module.exports = (app, config) => {
  app.use('/settings', SettingsRouter);
  app.use('/post', PostRouter);
  app.use('/user', UserRouter);

  // app.get('/*', (req, res) => {
  //   res.sendFile(config.rootPath + '/client/index.html');
  // });
};
