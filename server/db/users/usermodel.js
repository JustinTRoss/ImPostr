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
              `, {
                type: db.QueryTypes.INSERT,
              })
              .then((results) => {
                console.log(results, 'result from insert');
                let obj = {
                  message: `Successfully signed up username ${username}`,
                };
                callback(obj);
              })
              .catch((err) => {
                console.error(err, 'error on insert');
                callback(err);
              });
          }
        });
      }
    });
  },
  userLogin: (username, password, callback) => {
    db.query(
      `
      SELECT
        hash
      FROM
        users
      WHERE
        username = '${username}'
      `, {
        type: db.QueryTypes.SELECT,
      })
        .then((arr) => {
          let { hash } = arr[0];
          console.log(hash);
          bcrypt.compare(password, hash, (err, res) => {
            if (err) {
              console.error(err, 'bcrypt compare');
              callback(err);
            } else {
              callback(res);
            }
          });
        })
        .catch((err) => {
          callback(err);
        });
  },
};
