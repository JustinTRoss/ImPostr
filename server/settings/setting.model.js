//need to join to get access token? or include access token here

const sequelize = require('../config/sequelize');
const Sequelize = require('sequelize');
const User = require('../users/user.model');

const Setting = sequelize.define('platform_user', {
  platform_userId: { type: Sequelize.INTEGER, autoIncrement: true },
  userId: Sequelize.INTEGER,
  platformId: Sequelize.INTEGER,
  token: Sequelize.STRING,
  isActive: Sequelize.BOOLEAN,
  interests: Sequelize.STRING,
  interval: Sequelize.INTEGER,
  dueNext: Sequelize.DATE,
});

User.belongsToMany(Platform, { through: Setting });
Platform.belongsToMany(User, { through: Setting });
Setting.belongsTo(Platform);

Setting.sync();

module.exports = Setting;
