const SettingRouter = require('express').Router();
const SettingCntl = require('./setting.controller');

SettingRouter.get('/getSettings', (req, res) => {
  console.log(req.body);
  console.log('/settings/getSettings');
  SettingCntl.getSettings(req, res);
});

SettingRouter.put('/updateSettings', (req, res) => {
  console.log(req.body);
  console.log('/settings/updateSettings');
  SettingCntl.updateSettings(req, res);
});

SettingRouter.post('/requestPlatformLogin', (req, res) => {
  console.log(req.body);
  console.log('/settings/requestPlatformLogin');
  SettingCntl.requestPlatformLogin(req, res);
});

SettingRouter.post('/requestPlatformLogout', (req, res) => {
  console.log(req.body);
  console.log('/settings/requestPlatformLogout');
  SettingCntl.requestPlatformLogout(req, res);
});

module.exports = SettingRouter;
