const express = require('express');
const app = express();
const config = require('./config/initMiddleware.js');
const authRoutes = require('./routes/authRoutes.js');
const platformRoutes = require('./routes/platformRoutes.js');
const publicDir = require('path').join(__dirname, '../client');

config.init(app);
// middleware in ./config/init.js

app.use('/auth', authRoutes);
app.use('/platform', platformRoutes);
// routes

app.use(express.static(publicDir));

app.listen(3000, () => {
  console.log('Listening on 3000');
});
