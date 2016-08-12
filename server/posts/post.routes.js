const PostRouter = require('express').Router();
const PostCtrl = require('./post.controller');

PostRouter.post('/toggleIsActive', (req, res) => {
  console.log('/post/toggleIsActive');
  PostCtrl.toggleIsActive(req, res);
});

PostRouter.get('/getUser', (req, res) => {
  console.log('/post/getUser');
  PostCtrl.getUser(req, res);
});

module.exports = PostRouter;
