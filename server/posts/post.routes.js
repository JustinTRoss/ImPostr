const PostRouter = require('express').Router();
const PostCtrl = require('./post.controller');

PostRouter.post('/toggleIsActive', (req, res) => {
  PostCtrl.toggleIsActive(req, res);
});

PostRouter.get('/getUser', (req, res) => {
  PostCtrl.getUser(req, res);
});

PostRouter.get('/getPostHistory', (req, res) => {
  console.log('/post/getPostHistory');
  PostCtrl.getUserPostHistory(req, res);
});

module.exports = PostRouter;
