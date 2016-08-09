const express = require('express');
const app = express();
const config = require('./config/initMiddleware.js');
const AuthRouter = require('./routes/authRoutes.js');
const PlatformRouter = require('./routes/platformRoutes.js');
const publicDir = require('path').join(__dirname, '../client');
const db = require('./db/dbconnection.js');

config.init(app);
// middleware in ./config/init.js

db.dbStart();
app.use('/auth', AuthRouter);
app.use('/platform', PlatformRouter);
>>>>>>> Complete auth functionality
// routes

app.use(express.static(publicDir));

app.listen(3000, () => {
  console.log('Listening on 3000');
});
