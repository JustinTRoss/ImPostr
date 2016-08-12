const sequelize = require('../config/sequelize');
const Sequelize = require('sequelize');

const User = sequelize.define('user', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: { type: Sequelize.STRING, allowNull: false, unique: true },
  password: { type: Sequelize.STRING, allowNull: false },
});

User.sync();

module.exports = User;