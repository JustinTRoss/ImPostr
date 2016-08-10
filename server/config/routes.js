const PlatformRouter = require('../platforms/platform.routes');
const PlatformUserRouter = require('../platforms_users/platform_user.routes');
const PostRouter = require('../posts/post.routes');
const UserRouter = require('../users/user.routes');

module.exports = (app, config) => {
  app.use('/platform', PlatformRouter);
  app.use('/platformuser', PlatformUserRouter);
  app.use('/post', PostRouter);
  app.use('/user', UserRouter);

  app.get('/*', (req, res) => {
    res.sendFile(config.rootPath + '/client/index.html');
  });
};
