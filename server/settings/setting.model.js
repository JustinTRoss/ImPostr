//need to join to get access token? or include access token here

const sequelize = require('../config/sequelize');
const Sequelize = require('sequelize');
const User = require('../users/user.model');

const Setting = sequelize.define('setting', {
  settingId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  platform: Sequelize.STRING,
  token: Sequelize.STRING,
  isActive: Sequelize.BOOLEAN,
  interests: Sequelize.STRING,
  interval: Sequelize.INTEGER,
  dueNext: Sequelize.DATE,
});

Setting.belongsTo(User);

Setting.sync();

module.exports = Setting;
