const SettingRouter = require('express').Router();
const SettingCtrl = require('./setting.controller');

SettingRouter.get('/getSettings', (req, res) => {
  SettingCtrl.getSettings(req, res);
});

SettingRouter.put('/updateSettings', (req, res) => {
  SettingCtrl.updateSettings(req, res);
});

SettingRouter.post('/platformlogin', (req, res) => {
  SettingCtrl.requestPlatformLogin(req, res);
});

SettingRouter.post('/requestPlatformLogout', (req, res) => {
  SettingCtrl.requestPlatformLogout(req, res);
});

module.exports = SettingRouter;
