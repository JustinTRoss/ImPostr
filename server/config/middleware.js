const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('./passport');

module.exports = function(app, config){
  console.log(`morgan/body parser`);
  app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));
  app.use(cors());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(cookieParser());
};
