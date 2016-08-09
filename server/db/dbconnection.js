const pg = require('pg');
const creds = require('../../__cutestuff');
const Sequelize = require('sequelize');

const db = new Sequelize(`postgres://${creds.DB_USER}:${creds.DB_SECRET}@${creds.DB_ENDPOINT}:5432/thesis`, {
  dialectOptions: {
    ssl: true,
  },
});

module.exports = db;
