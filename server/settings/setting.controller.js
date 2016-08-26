const Setting = require('./setting.model');

const getActiveOverDueNext = () => {
  return Setting.findAll({
    where: {
      isActive: true,
      dueNext: {
        $lt: new Date(),
      },
    },
  });
};

const updateDueNext = (settingId, dueNext) => {
  return Setting.update({
    dueNext,
  }, {
    where: {
      settingId,
    },
  });
};

/**
 * GET /settings/getSettings
 * @param  {object} req { user: {userId: [number]}}
 * @param  {object} res body: {settings: [array]}
 */
const getSettings = (req, res) => {
  const { userId } = req.user;
  Setting.findAll({
    where: {
      userUserId: userId,
    },
  }).then(userSettings => {
    res.json({
      settings: userSettings,
    });
  });
};

/**
 * PUT /settings/updateSettings
 * @param  {object} req { body: { settings: { interests: [string], interval: [number], isActive: [bool] }, platform: [string] }, user: {userId: [number]}}
 * @param  {object} res body: { settings: [array] }
 */
const updateSettings = (req, res) => {
  const { settings, platform } = req.body;
  const { interests, interval, isActive } = settings;
  const { userId } = req.user;

  Setting.findAll({
    where: {
      userUserId: userId,
      platform,
    },
  })
  .then(settingsQuery => {
    if (settingsQuery.length) {
      Setting.update({
        interests,
        interval,
        isActive,
        dueNext: new Date(),
      }, {
        where: {
          userUserId: userId,
          platform,
        },
      }).then(updateStatus => {
        if (updateStatus[0] === 1) {
          const updatedSettings = Object.assign(settings, platform);
          res.json({
            settings: updatedSettings,
          });
        }
      });
    } else {
      Setting.create({
        interests,
        interval,
        isActive,
        platform,
        userUserId: userId,
        dueNext: new Date(),
      }).then(newSettingObj => {
        res.json({
          settings: newSettingObj,
        });
      });
    }
  });
};

/**
 * POST /settings/requestPlatformLogout
 * @param  {object} req { body: { platform: [string] }, user: {userId: [number]}}
 * @param  {object} res body: { status: [bool] }
 */
const requestPlatformLogout = (req, res) => {
  const { platform } = req.body;
  const { userId } = req.user;

  Setting.update({
    token: '',
    tokenSecret: '',
  }, {
    where: {
      userUserId: userId,
      platform,
    },
  }).then(() => {
    res.json({
      status: true,
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
