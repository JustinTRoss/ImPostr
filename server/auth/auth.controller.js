const Settings = require('../settings/setting.model');
const jwt = require('jwt-simple');
const fetch = require('isomorphic-fetch');
const config = require('../config/config');
const { LINKEDIN_KEY, LINKEDIN_SECRET } = require('../../__cutestuff');
const { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET } = require('../../__cutestuff');

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
      });
    } else {
      Settings.create({
        userUserId: userId,
        platform: 'twitter',
        token: req.user.token,
        tokenSecret: req.user.tokenSecret,
      });
    }
  })
  .then(() => {
    res.redirect('/');
  })
  .catch(err => console.log(err));
};

const saveLinkedInToken = (req, res) => {
console.log('saveLinkedInToken');
  const { userId } = jwt.decode(req.cookies.jwtStuff, config.secret);
  fetch(`https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${req.query.code}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Flinkedin%2Fcallback&client_id=${LINKEDIN_KEY}&client_secret=${LINKEDIN_SECRET}`, {
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
      if (settings) {
        settings.updateAttributes({
          token: json.access_token,
        });
      } else {
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
  })
  .catch(err => console.log(err));
};

const saveFacebookToken = (req, res) => {
  console.log('req gettting hit', req);
  const { userId } = jwt.decode(req.cookies.jwtStuff, config.secret);
  console.log('userId', userId);
  const url = `https://www.facebook.com/dialog/oauth?client_id=${FACEBOOK_APP_ID}&response_type=token&redirect_uri=http%3A%2F%2Fwww.localhost%3A3000%2Fauth%2Ffacebook%2Fcallback`
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'cors': 'no-cors',
    },
  })
  .then(response => {
  console.log('response', response);
    res.redirect('/')
  })

  // .then(res => {
  //   res.json()
  // })
  // .then(json => {
  //   console.log(json, 'THIS IS OUR TOKEN!');
  //   Settings.findOne({
  //     where: {
  //       userUserId: userId,
  //       platform: 'facebook',
  //     },
  //   })
  //   .then(settings => {
  //     if (settings) {
  //       settings.updateAttributes({
  //         token: json.access_token,
  //       });
  //     } else {
  //       Settings.create({
  //         userUserId: userId,
  //         platform: 'facebook',
  //         token: json.access_Token,
  //       });
  //     }
  //   });
  // })
  // .then(() => {
  //   res.redirect('/');
  // })
  // .catch(err => console.log(err));

};




module.exports = {
  saveLinkedInToken,
  saveTwitterTokens,
  saveFacebookToken,
};
