//add access token or grab on posting

const sequelize = require('../config/sequelize');
const Sequelize = require('sequelize');
const User = require('../users/user.model');

const Post = sequelize.define('post', {
  postId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  platform: Sequelize.STRING,
  isActive: Sequelize.BOOLEAN,
  message: Sequelize.STRING,
  expires: Sequelize.DATE,
});

Post.belongsTo(User);

Post.sync();

module.exports = Post;
