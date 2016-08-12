const Flutter = require('flutter');
const Settings = require('../../server/settings/setting.model');

const flutter = new Flutter({
  consumerKey: 'iuzErv06c19D6Jqo1xT8pJP1N',
  consumerSecret: 'Z2AdiITIkBQPHi890hqaWIASlwEoc21G5Y2ggVsU9mEHuCFaOt',
  loginCallback: 'http://127.0.0.1:3000/twitter/callback',

  authCallback: (req, res) => {
    if (req.error) {
      // Authentication failed, req.error contains details
      return;
    }

    const accessToken = req.session.oauthAccessToken;
    const secret = req.session.oauthAccessTokenSecret;

    // Store away oauth credentials here
    Settings.findOne({ where: { userUserId: req.user.userId, platform: 'twitter' } })
    .then(settingObj => {
      settingObj.updateAttributes({
        token: `${accessToken} | ${secret}`,
      });
    })
    // Redirect user back to your app
    .then(res.redirect('/'));
  },
});

module.exports = flutter;

// const createNonce = () => {
//   let text = '';
//   const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   for (let i = 0; i < 32; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   text = window.btoa(text).replace(/\+/g, '0').replace(/\//g, '0');
//   return text;
// };
