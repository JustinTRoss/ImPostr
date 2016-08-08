var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

module.exports = {
  init: (app) => {
    console.log(`morgan/body parser`);
    app.use(morgan('dev'));
    app.use(bodyParser.json());
  },
};
