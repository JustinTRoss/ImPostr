const PlatformRouter = require('express').Router();
const PlatformCtrl = require('./platform.controller');

PlatformRouter.post('/platformlogin', (req, res) => {
  console.log('/platform/platformlogin');
  console.log(req.body);
  let platform = req.body.platform;
  console.log('platform ' , platform);
  let response;
  switch (platform) {
    case 'facebook':
      response = {
        status: 'FB logged in',
      };
      break;
    case 'twitter':
      response = {
        status: 'TWTR logged in',
      };
      break;
    case 'linkedin':
      response = {
        status: 'LNKD logged in',
      };
      break;
    default:
      response = {
        status: 'not found',
      };
  }
  res.json(response);
});

PlatformRouter.post('/platformlogout', (req, res) => {
  console.log('/platform/platformlogout');
  console.log(req.body);
  let platform = req.body.platform;
  let response;
  switch (platform) {
    case 'facebook':
      response = {
        status: 'FB logged out',
      };
      break;
    case 'twitter':
      response = {
        status: 'TWTR logged out',
      };
      break;
    case 'linkedin':
      response = {
        status: 'LNKD logged out',
      };
      break;
    default:
      response = {
        status: 'not found',
      };
  }
  res.json(response);
});

PlatformRouter.put('/updatesettings', (req, res) => {
  console.log('/platform/updatesettings');
  console.log(req.body);
  let platform = req.body.platform;
  let response;
  switch (platform) {
    case 'facebook':
      response = {
        status: 'FB settings updated',
      };
      break;
    case 'twitter':
      response = {
        status: 'TWTR settings updated',
      };
      break;
    case 'linkedin':
      response = {
        status: 'LNKD settings updated',
      };
      break;
    default:
      response = {
        status: 'not found',
      };
  }
  res.json(response);
});

module.exports = PlatformRouter;
