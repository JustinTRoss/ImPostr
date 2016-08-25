const User = require('./user.model');
const jwt = require('jwt-simple');
const config = require('../config/config');
const util = require('./util');

const checkJWT = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const { userId } = req.user;
  res.json({
    userId,
    token,
  });
};

const userSignup = (req, res) => {
  if (req.body.password.length >= 8 && req.body.username.length >= 8) {
    return util.hashPassword(req.body.password)
    .then(hashedPassword => {
      req.body.password = hashedPassword;
      return User.create(req.body);
    })
    .then(user => {
      const { userId } = user;
      const token = jwt.encode({ userId }, config.secret);
      res.json({
        token,
      });
    })
    .catch(error => {
      res.status(500);
      res.send({ status: false });
    });
  } else {
    res.status(500);
    res.send({ status: false });
  }
};

const userLogin = (req, res) => {
  return User.findOne({
    where: {
      username: req.body.username,
    },
  })
  .then(user => {
    if (user) {
      req.body.user = user;
      return util.comparePassword(req.body.password, user.password);
    }
  })
  .then(passwordMatches => {
    if (passwordMatches) {
      const { userId } = req.body.user;
      const token = jwt.encode({ userId }, config.secret);
      res.json({
        token,
      });
    }
  });
};

module.exports = {
  checkJWT,
  userSignup,
  userLogin,
};
