const Settings = require('../settings/setting.model');
const jwt = require('jwt-simple');
const fetch = require('isomorphic-fetch');
const config = require('../config/config');
const { LINKEDIN_KEY, LINKEDIN_SECRET } = require('../../__cutestuff');

const saveLinkedInToken = (req, res) => {
  const { userId } = jwt.decode(req.cookies.jwtStuff, config.secret);
  fetch(`https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${req.query.code}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Flinkedin%2Fcallback&client_id=${LINKEDIN_KEY}&client_secret=${LINKEDIN_SECRET}`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
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

module.exports = {
  saveLinkedInToken,
};
