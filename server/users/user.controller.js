const User = require('./user.model');
const jwt = require('jwt-simple');
const config = require('../config/config');
const util = require('./util');

module.exports = {
  checkJWT,
  userLogout,
  userSignup,
  userLogin,
};

/****** PUBLIC ******/

function checkJWT(req, res) {
  res.json({
    userId: req.user.userId,
  });
}

//logout
function userLogout(req, res) {
  const userId = req.body.user.userId;
  res.json({
    userId: req.body.user.userId,
    storedState: req.body.storedState,
  });
}

function userSignup(req, res) {
  if (req.body.password.length >= 8 && req.body.username.length >= 8) {
    return util.hashPassword(req.body.password)
    .then(hashedPassword => {
      req.body.password = hashedPassword;
      return User.create(req.body);
    })
    .then(user => {
      let { userId } = user;
      const token = jwt.encode({userId}, config.secret);
      res.json({
        token,
      });
    });    
  } else {
    res.status(500).send({error: 'http://apne.ws/2brrH0G'});
  }
}

function userLogin(req, res) {
  return User.findOne({where : {username : req.body.username}})
  .then(user => {
    if (user) {
      req.body.user = user;
      return util.comparePassword(req.body.password, user.password);
    }
  })
  .then(passwordMatches => {
    if (passwordMatches) {
      let { userId } = req.body.user;
      const token = jwt.encode({userId}, config.secret);
      res.json({
        token
      });
    }
  });
}
