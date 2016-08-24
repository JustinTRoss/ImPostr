const sequelize = require('../config/sequelize');
const Sequelize = require('sequelize');
const User = require('../users/user.model');

const Setting = sequelize.define('setting', {
  settingId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  platform: Sequelize.STRING,
  token: Sequelize.STRING,
  tokenSecret: Sequelize.STRING,
  profileName: Sequelize.STRING,
  profileImg: Sequelize.STRING,
  isActive: Sequelize.BOOLEAN,
  interests: Sequelize.STRING,
  interval: Sequelize.INTEGER,
  dueNext: Sequelize.DATE,
});

Setting.belongsTo(User);

Setting.sync();

module.exports = Setting;
