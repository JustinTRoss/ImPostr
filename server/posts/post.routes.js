const PostRouter = require('express').Router();
const {
  toggleIsActive,
  getUser,
  getUserPostHistory,
  addNewFromUser,
} = require('./post.controller');

PostRouter.post('/toggleIsActive', toggleIsActive);

PostRouter.get('/getUser', getUser);

PostRouter.get('/getPostHistory', getUserPostHistory);

PostRouter.post('/addNewFromUser', addNewFromUser);

module.exports = PostRouter;
