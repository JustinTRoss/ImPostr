const PlatformUserRouter = require('express').Router();
const PlatformUserRouterCntl = require('./platform_user.controller');

PlatformUserRouter.get('/getSettings', (req, res) => {
  console.log(req.body);
  console.log('/platformuser/getSettings');
  PlatformUserRouterCntl.getSettings(req, res);
});

PlatformUserRouter.put('/updateSettings', (req, res) => {
  console.log(req.body);
  console.log('/platformuser/updateSettings');
  PlatformUserRouterCntl.updateSettings(req, res);
});

PlatformUserRouter.post('/requestPlatformLogin', (req, res) => {
  console.log(req.body);
  console.log('/platformuser/requestPlatformLogin');
  PlatformUserRouterCntl.requestPlatformLogin(req, res);
});

PlatformUserRouter.post('/requestPlatformLogout', (req, res) => {
  console.log(req.body);
  console.log('/platformuser/requestPlatformLogout');
  PlatformUserRouterCntl.requestPlatformLogout(req, res);
});

module.exports = PlatformUserRouter;
