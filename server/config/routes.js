const SettingsRouter = require('../settings/setting.routes');
const PostRouter = require('../posts/post.routes');
const UserRouter = require('../users/user.routes');
const passport = require('passport');
const { secret } = require('./config');

module.exports = (app, config) => {
  app.get('/', (req, res, next) => {
    if (req.query.code !== undefined) {
      console.log(req.query.code, 'here!');
    }
    next();
  });
  app.use('/settings', passport.authenticate('jwt', {session: false}), SettingsRouter);
  app.use('/post', passport.authenticate('jwt', {session: false}), PostRouter);
  app.use('/user', UserRouter);

  // --- leave me alone for now (Steven)
  app.get('/auth/linkedin',
    passport.authenticate('linkedin', { state: secret }),
    (req, res) => { /*will not be called since redirect to linkedIn*/}
  );

  // app.get('/auth/linkedin/callback', (req, res) => {
  //   console.log(req.query.code);
  // });

  // app.get('/*', (req, res) => {
  //   res.sendFile(config.rootPath + '/client/index.html');
  // });
};
