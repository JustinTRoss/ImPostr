const Promise = require('bluebird');
const bcrypt = require('bcrypt-nodejs');
Promise.promisifyAll(bcrypt, {
  context: bcrypt,
});

const hashPassword = (password, callback) => {
  return bcrypt.genSalt(10)
    .then((salt) => {
      return bcrypt.hash(password, salt)
      .then(hash => callback(hash))
      .catch(err => console.error(err, 'error on hashing'));
    })
    .catch(err => console.error(err, 'error on generating salt'));
};

const comparePassword = (password, hash, callback) => {
  return bcrypt.compare(password, hash)
    .then(bool => callback(bool))
    .catch(err => console.error('error on comparing hash', err));
};

module.exports = {
  hashPassword,
  comparePassword,
};
