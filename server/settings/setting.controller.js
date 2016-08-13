const Setting = require('./setting.model');

//saveInitial

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
  //**FIX CLIENT LABELLING and interests to a comma deliminated string
  //**connected to client**
const updateSettings = (req, res) => {
  const { settingId, settings, platform } = req.body;
  const { interests, interval, isActive } = settings;
  const { userId } = req.user;

  if (settingId) {
    Setting.update({
      interests,
      interval,
      isActive,
    }, {
      where: {
        settingId,
      },
    }).then(updateStatus => {
      //update status validation, returning [1]...
      const response = { interests, interval, isActive, platform, settingId };
      res.send(response);
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
};

//requestPlatformLogin
  //for client to login to a platform { boolean }
const requestPlatformLogin = (req, res) => {
  const { platform, accessToken } = req.body;
  const { userId } = req.user;

  Setting.findAll({
    where: {
      userUserId: userId,
      platform,
    },
  }).then(settings => {
    if (settings.length) {
      Setting.update({
        token: accessToken,
      }, {
        where: {
          userUserId: userId,
          platform,
        },
      }).then(status => {
        res.json({
          verdict: 'success',
        });
      })
    } else {
  console.log('platform, accessToken', platform, accessToken);
  console.log('userId', userId);
      Setting.create({
        userUserId: userId,
        platform,
        token: accessToken,
      }).then(newSetting => {
        res.json(newSetting);
      });
    }
  })
};

//requestPlatformLogout
  //for client to logout to a platform { boolean }
const requestPlatformLogout = (req, res) => {
  //make a call to social media manager
};

module.exports = {
  getActiveOverDueNext,
  updateDueNext,
  getSettings,
  updateSettings,
  requestPlatformLogin,
  requestPlatformLogout,
};
