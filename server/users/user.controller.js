const User = require('./user.model');

module.exports = {
  userSignup,
  userLogin,
};

/****** PUBLIC ******/

//checkJWT

//logout

function userSignup(req, res) {
  let { username, password } = req.body;
  console.log(username, password);
  usermodel.userSignup(username, password, (results) => {
    res.json(results);
  });
}

function userLogin(req, res) {
  let { username, password } = req.body;
  usermodel.userLogin(username, password, (results) => {
    res.json({
      loggedIn: results,
    });
  });
}
