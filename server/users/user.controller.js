const User = require('./user.model');
const jwt = require('jwt-simple');

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
  let { username, password } = req.body;
  User.create({
    username,
    password,
  })
    .then(({id}) => { // Check if the parens are necessary

    })
  res.json({
    username,
    password,
  });
}

function userLogin(req, res) {
  let { username, password } = req.body;
  // usermodel.userLogin(username, password, (results) => {
  //   res.json({
  //     loggedIn: results,
  //   });
  // });
  res.json({
    username,
    password,
  });
}
