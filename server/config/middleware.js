const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
require('./passport');


module.exports = function(app, config){
  app.use(cors());
  app.use(passport.initialize());
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(cookieParser());
};
