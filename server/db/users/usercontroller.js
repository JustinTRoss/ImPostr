const usermodel = require('./usermodel');

module.exports = {
  userSignup: (req, res) => {
    let { username, password } = req.body;
    console.log(username, password);
    usermodel.userSignup(username, password, (results) => {
      res.json(results);
    });
  },

  userLogin: (req, res) => {
    let { username, password } = req.body;
    usermodel.userLogin(username, password, (results) => {
      res.json({
        loggedIn: results,
      });
    });
  },
};
