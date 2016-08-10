const sequelize = require('../config/sequelize');
const Sequelize = require('sequelize');


const User = sequelize.define('user', {
  username: { type: Sequelize.STRING, allowNull: false, unique: true},
  password: { type: Sequelize.STRING, allowNull: false },
  fullName: {type: Sequelize.STRING, allowNull: false},
  email: {type: Sequelize.STRING, allowNull: false, unique: true}
});

User.sync();

module.exports = User;