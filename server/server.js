const express = require('express');
const config = require('./config/config');
const publicDir = require('path').join(__dirname, '../client');

const app = express();

require('./config/sequelize');
require('./config/middleware')(app, config);
require('./config/routes')(app);

// require('./workers/testWorkers');

app.use(express.static(publicDir));

app.listen(config.port, () => {
  console.log(`Listening on ${config.port}`);
});

module.exports = app;
