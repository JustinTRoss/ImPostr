const Setting = require('./setting.model');
const request = require('request');
const twitterLogin = require('../../apiServers/TwitterApi/auth.controller');

const { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET } = require('../../__cutestuff');

//getActiveOverDueNext
  //for postGenerator worker to get a list of users over due to generate post
const getActiveOverDueNext = (cb) => {
  Setting.findAll({
    where: {
      isActive: true,
      dueNext: {
        $lt: new Date(),
      },
    },
  }).then(activeOverDueNext => {
    cb(activeOverDueNext);
  })
};

//updateDueNext
  //for postGenerator worker to update a specific users dueNext field
const updateDueNext = (settingId, dueNext, cb) => {
  Setting.update({
    dueNext,
  }, {
    where: {
      settingId,
    },
  }).then(updateStatus => {
    cb(updateStatus);
  });
};

//getSettings
  //for client to populate state { interests, frequency, isActive }
const getSettings = (req, res) => {
  const { userId } = req.user;
  Setting.findAll({
    where: {
      userUserId: userId,
    },
  }).then(userSettings => {
    res.send(userSettings);
  });
};

//updateSettings
  //for client to update settings { interests, frequency, isActive }
const updateSettings = (req, res) => {
  const { settingId, settings, platform } = req.body;
  const { interests, interval, isActive } = settings;
  const { userId } = req.user;
  const response = { interests, interval, isActive, platform, settingId };

  Setting.findAll({
    where: {
      userUserId: userId,
      platform,
    },
  }).then(settings => {
    if (settings.length) {
      Setting.update({
        interests,
        interval,
        isActive,
      }, {
        where: {
          userUserId: userId,
          platform,
        },
      }).then(status => {
        res.send(response)
      });
    } else {
      Setting.create({
        interests,
        interval,
        isActive,
        platform,
        userUserId: userId,
        dueNext: new Date(),
      }).then(newSetting => {
        res.json(newSetting);
      });
    }
  })
};

//requestPlatformLogout
  //for client to logout to a platform { boolean }
const requestPlatformLogout = (req, res) => {
  const { platform } = req.body;
  const { userId } = req.user;

  Setting.update({
    token: '',
  }, {
    where: {
      userUserId: userId,
      platform,
    },
  }).then(status => {
    res.json({
      verdict: 'success',
    });
  });
};

module.exports = {
  getActiveOverDueNext,
  updateDueNext,
  getSettings,
  updateSettings,
  requestPlatformLogout,
};
