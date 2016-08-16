const PostRouter = require('express').Router();
const PostCtrl = require('./post.controller');

PostRouter.post('/toggleIsActive', (req, res) => {
  PostCtrl.toggleIsActive(req, res);
});

PostRouter.get('/getUser', (req, res) => {
  PostCtrl.getUser(req, res);
});

PostRouter.get('/getPostHistory', (req, res) => {
  PostCtrl.getUserPostHistory(req, res);
});

PostRouter.post('/addNewFromUser', (req, res) => {
  PostCtrl.addNewFromUser(req, res);
});

module.exports = PostRouter;
