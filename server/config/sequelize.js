const config = require('./config');
const Sequelize = require('sequelize');
const db = new Sequelize(config.db, {
  logging: false,
  dialectOptions: {
    ssl: true,
  },
});

db.authenticate()
  .then((err) => {
    console.log('Connection established to psql.');
  })
  .catch((err) => {
    console.log('Trouble connecting to psql');
    console.error(err);
  });

module.exports = db;
