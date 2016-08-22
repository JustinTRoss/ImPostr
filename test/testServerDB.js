const express = require('express');
const app = express();

const Sequelize = require('sequelize');
const dbURL = 'postgres://palpaca:mattdubiesucks123@impostorthesis.ct52emcpwnt6.us-west-1.rds.amazonaws.com/thesis_test';

const db = new Sequelize(dbURL, {
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

module.exports = {
  app,
};
