//need to join to get access token? or include access token here

const sequelize = require('../config/sequelize');
const Sequelize = require('sequelize');
const User = require('../users/user.model');
const Platform = require('../topics/platform.model');

const Post = sequelize.define('post', {
  postId: { type: Sequelize.INTEGER, autoIncrement: true },
  userId: Sequelize.INTEGER,
  platformId: Sequelize.INTEGER,
  isActive: Sequelize.BOOLEAN,
  message: Sequelize.STRING,
  expires: Sequelize.DATE,
});

User.belongsToMany(Platform, { through: Post });
Platform.belongsToMany(User, { through: Post });
Post.belongsTo(Platform);

Post.sync();

module.exports = Post;
