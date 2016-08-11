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
  let state = 'state';
  res.json({
    state,
  });
}

//logout
function userLogout(req, res) {
  let { userid, state} = req.body;
  res.json({
    userid,
    state,
  });
}

function userSignup(req, res) {
  return util.hashPassword(req.body.password)
  .then(hashedPassword => {
    req.body.password = hashedPassword;
    console.log(req.body);
    return User.create(req.body);
  })
  .then(user => { 
    let { userId } = user; 
    const token = jwt.encode({userId}, config.secret);
    res.json({
      token,
    });
  });
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
