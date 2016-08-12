const SettingRouter = require('express').Router();
const SettingCtrl = require('./setting.controller');

SettingRouter.get('/getSettings', (req, res) => {
  console.log(req.body);
  console.log('/settings/getSettings');
  SettingCtrl.getSettings(req, res);
});

SettingRouter.put('/updateSettings', (req, res) => {
  console.log(req.body);
  console.log('/settings/updateSettings');
  SettingCtrl.updateSettings(req, res);
});

SettingRouter.post('/platformlogin', (req, res) => {
  console.log(req.body);
  console.log('/settings/requestPlatformLogin');
  SettingCtrl.requestPlatformLogin(req, res);
});

SettingRouter.post('/requestPlatformLogout', (req, res) => {
  console.log(req.body);
  console.log('/settings/requestPlatformLogout');
  SettingCtrl.requestPlatformLogout(req, res);
});

module.exports = SettingRouter;
