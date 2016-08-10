// const AuthRouter = require('../auth/auth.routes');
const PlatformRouter = require('../platforms/platforms.routes');
// const PlatformUserRouter = require('../platforms_users/platform_user.routes');
// const PostRouter = require('../posts/post.routes');
const UserRouter = require('../users/user.routes');

module.exports = function(app, config) {
  // app.use('/auth', AuthRouter);
  app.use('/platform', PlatformRouter);
  // app.use('/platformuser', PlatformUserRouter);
  // app.use('/post', PostRouter);
  app.use('/user', UserRouter);

//may need to add public folder to client
  app.get('/*', (req, res) => {
    res.sendFile(config.rootPath + '/client');
  });
}