const Promise = require('bluebird');
const bcrypt = require('bcrypt');

Promise.promisifyAll(bcrypt, {
  context: bcrypt,
});

const hashPassword = (password) => {
  return bcrypt.genSaltAsync(10)
  .then(salt => {
    return bcrypt.hashAsync(password, salt);
  })
  .catch(err => console.error(err, 'error on generating salt'));
};

const comparePassword = (password, hash) => {
  return bcrypt.compareAsync(password, hash)
  .catch(err => console.error('error on comparing hash', err));
};

module.exports = {
  hashPassword,
  comparePassword,
};
