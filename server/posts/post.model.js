//add access token or grab on posting

const sequelize = require('../config/sequelize');
const Sequelize = require('sequelize');
const User = require('../users/user.model');

const Post = sequelize.define('post', {
  postId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  platform: Sequelize.STRING,
  token: Sequelize.STRING,
  isActive: Sequelize.BOOLEAN,
  message: Sequelize.STRING,
  expires: Sequelize.DATE,
  posted: Sequelize.BOOLEAN,
});

Post.belongsTo(User);

Post.sync();

module.exports = Post;
