const User = require('./user.model');
const jwt = require('jwt-simple');
const config = require('../config/config');
const util = require('./util');

/**
 * GET /user/checkJWT
 * @param  {object} req { headers: { authorization: [string] }, user: {userId: [number]}}
 * @param  {object} res body: { userId: [number], token: [string] }
 */
const checkJWT = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const { userId } = req.user;
  res.json({
    userId,
    token,
  });
};

/**
 * POST /user/userSignup
 * @param  {object} req { body: { password: [string], username: [string] }}
 * @param  {object} res body: { token: [string], status: [bool]}
 */
const userSignup = (req, res) => {
  const { username, password } = req.body;
  if (password.length >= 8 && username.length >= 8) {
    return util.hashPassword(password)
    .then(hashedPassword => {
      return User.create({
        username,
        password: hashedPassword,
      });
    })
    .then(user => {
      const { userId } = user;
      const token = jwt.encode({ userId }, config.secret);
      res.json({
        token,
      });
    })
    .catch(() => {
      res.status(500).send({ status: false });
    });
  } else {
    res.status(500).send({ status: false });
  }
};

/**
 * POST /user/userLogin
 * @param  {object} req { body: { password: [string], username: [string] }}
 * @param  {object} res body: { token: [string] }
 */
const userLogin = (req, res) => {
  const { username, password } = req.body;
  return User.findOne({
    where: {
      username,
    },
  })
  .then(user => {
    if (user && util.comparePassword(password, user.password)) {
      return user;
    }
  })
  .then(user => {
    const { userId } = user;
    const token = jwt.encode({ userId }, config.secret);
    res.json({
      token,
    });
  });
};

module.exports = {
  checkJWT,
  userSignup,
  userLogin,
};
