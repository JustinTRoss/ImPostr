const bcrypt = require('bcrypt-nodejs');
const SALT = require('../../../__cutestuff').SALTFACTOR;
const pg = require('pg');
const db = require('../dbconnection.js');


module.exports = {
  userSignup: (username, password, callback) => {
    bcrypt.genSalt(SALT, (err, salt) => {
      if (err) {
        console.error(err);
      } else {
        bcrypt.hash(password, salt, null, (err, result) => {
          if (err) {
            console.error(err);
          } else {
            db.query(
              `
              INSERT INTO
                users (username, hash, salt)
              VALUES
                ('${username}', '${result}', '${salt}')
              `, (err, rows) => {
                if (err) {
                  console.error(err);
                } else {
                  callback(rows);
                  console.log(rows);
                }
              });
          }
        });
      }
    });
  },
};
