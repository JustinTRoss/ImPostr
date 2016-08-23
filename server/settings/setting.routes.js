const SettingRouter = require('express').Router();
const {
  getSettings,
  updateSettings,
  requestPlatformLogout,
} = require('./setting.controller');

SettingRouter.get('/getSettings', getSettings);

SettingRouter.put('/updateSettings', updateSettings);

SettingRouter.post('/requestPlatformLogout', requestPlatformLogout);

module.exports = SettingRouter;
