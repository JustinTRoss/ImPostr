//need to join to get access token? or include access token here

const sequelize = require('../config/sequelize');
const Sequelize = require('sequelize');
const User = require('../users/user.model');
const Platform = require('../topics/platform.model');

const Platform_User = sequelize.define('platform_user', {
  platform_userId: { type: Sequelize.INTEGER, autoIncrement: true },
  userId: Sequelize.INTEGER,
  platformId: Sequelize.INTEGER,
  token: Sequelize.STRING,
  isActive: Sequelize.BOOLEAN,
  interests: Sequelize.STRING,
  interval: Sequelize.INTEGER,
  dueNext: Sequelize.DATE,
});

User.belongsToMany(Platform, { through: Platform_User });
Platform.belongsToMany(User, { through: Platform_User });
Platform_User.belongsTo(Platform);

Platform_User.sync();

module.exports = Platform_User;
