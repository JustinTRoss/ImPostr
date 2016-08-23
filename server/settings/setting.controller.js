const Setting = require('./setting.model');

/**
 * for postGenerator worker to get a list of users over due to generate post
 * @return {object} settings - promise object that resolves to an array of setting objects
 */
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

/**
 * for postGenerator worker to update a specific users dueNext field
 * @param  {number} settingId - unique id for setting
 * @param  {date} dueNext - new date for this setting to be ready to post again
 * @return {object} status - returns a promise object that is an array with number of values changed
 */
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
 * for client to populate state
 * @param  {object} req - http req object, { userId } is encapulsated param of interest
 * @param  {object} res - http res object { userSettings } object is sent back
 * @return {null}
 */
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

/**
 * for client to update settings or initilize if not creeated
 * @param  {object} req - http req object, { userId, settings, platform, settings } is encapulsated params of interest
 * @param  {object} res - http res object { settingObj } is sent back
 * @return {null}
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
      }).then(settingObj => {
        res.json(settingObj);
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
        res.json(newSettingObj);
      });
    }
  });
};

/**
 * for client to logout to a platform
 * @param  {object} req - http req object, { userId, platform } is encapulsated params of interest
 * @param  {object} res - http res object { statusObject } is sent back
 * @return {null}
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
