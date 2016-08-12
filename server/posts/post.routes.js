const PostRouter = require('express').Router();
const PostCtrl = require('./post.controller');

PostRouter.put('/toggleIsActive', (req, res) => {
  console.log(req.body);
  console.log('/posts/toggleIsActive');
  PostCtrl.toggleIsActive(req, res);
});

PostRouter.get('/getUser', (req, res) => {
  console.log('/post/getUser');
  PostCtrl.getUser(req, res);
});

module.exports = PostRouter;
