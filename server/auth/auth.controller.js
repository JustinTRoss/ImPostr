const Settings = require('../settings/setting.model');
const jwt = require('jwt-simple');
const fetch = require('isomorphic-fetch');
const config = require('../config/config');
const {
  LINKEDIN_KEY,
  LINKEDIN_SECRET,
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
} = require('../../__cutestuff');

const saveTwitterTokens = (req, res) => {
  const { userId } = jwt.decode(req.cookies.jwtStuff, config.secret);
  Settings.findOne({
    where: {
      userUserId: userId,
      platform: 'twitter',
    },
  })
  .then(settings => {
    if (settings) {
      settings.updateAttributes({
        token: req.user.token,
        tokenSecret: req.user.tokenSecret,
        profileName: req.user.screen_name,
        profileImg: req.user.profile_image_url_https,
      });
    } else {
      Settings.create({
        userUserId: userId,
        platform: 'twitter',
        token: req.user.token,
        tokenSecret: req.user.tokenSecret,
        profileName: req.user.screen_name,
        profileImg: req.user.profile_image_url_https,
      });
    }
  })
  .then(() => {
    res.redirect('/');
  });
};

const saveLinkedInToken = (req, res) => {
  const { userId } = jwt.decode(req.cookies.jwtStuff, config.secret);
  const redirectURI = `${config.alternateDomain}%2Fauth%2Flinkedin%2Fcallback`;

  fetch(`https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${req.query.code}&redirect_uri=${redirectURI}&client_id=${LINKEDIN_KEY}&client_secret=${LINKEDIN_SECRET}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'cors': 'no-cors',
    },
  })
  .then(res => res.json())
  .then(json => {
    Settings.findOne({
      where: {
        userUserId: userId,
        platform: 'linkedin',
      },
    })
    .then(settings => {
      console.log('updating', settings, json);
      if (settings) {
        settings.updateAttributes({
          token: json.access_token,
        });
      } else {
        console.log('creating', settings, json);
        Settings.create({
          userUserId: userId,
          platform: 'linkedin',
          token: json.access_token,
        });
      }
    });
  })
  .then(() => {
    res.redirect('/');
  });
};

const saveFacebookToken = (req, res) => {
  const { code } = req.query;
  const redirectURI = `${config.hostedDomain}%2Fauth%2Ffacebook%2Fcallback`;
  const { userId } = jwt.decode(req.cookies.jwtStuff, config.secret);
  const url = `https://graph.facebook.com/v2.3/oauth/access_token?client_id=${FACEBOOK_APP_ID}&redirect_uri=${redirectURI}&client_secret=${FACEBOOK_APP_SECRET}&code=${code}`;

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  .then(res => res.json())
  .then(json => {
    Settings.findOne({
      where: {
        userUserId: userId,
        platform: 'facebook',
      },
    })
    .then(settings => {
      if (settings) {
        console.log('updating', settings, json);
        settings.updateAttributes({
          token: json.access_token,
        });
      } else {
        console.log('creating');
        Settings.create({
          userUserId: userId,
          platform: 'facebook',
          token: json.access_token,
        });
      }
    });
  })
  .then(() => {
    res.redirect('/');
  });
};

module.exports = {
  saveLinkedInToken,
  saveTwitterTokens,
  saveFacebookToken,
};
