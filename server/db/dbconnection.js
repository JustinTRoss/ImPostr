const pg = require('pg');
const creds = require('../../__cutestuff');

module.exports = {
  dbStart: () => {
    let client = new pg.Client({
      user: creds.DB_USER,
      database: 'thesis',
      password: creds.DB_SECRET,
      host: creds.DB_ENDPOINT,
    });
    client.connect((err) => {
      if (err) {
        console.log(err);
      }
    });
    client.on('connect', () => {
      console.log('psql started');
    });
  },
}
