const Platform_User = require('./platform_user.model');


//getActiveOverDueNext
  //for postGenerator worker to get a list of users over due to generate post
const getActiveOverDueNext = (cb) => {
  Platform_User.findAll({
    where: {
      isActive: true,
      dueNext: {
        $lt: new Date(),
      },
    },
  }).then(activeOverDueNext => {
    console.log('activeOverDueNext ' , activeOverDueNext);
    cb(activeOverDueNext);
  })
};

//updateDueNext
  //for postGenerator worker to update a specific users dueNext field
const updateDueNext = (platform_userId, dueNext, cb) => {
  Platform_User.update({
    dueNext,
  }, {
    where: {
      platform_userId,
    },
  }).then(updateStatus => {
    console.log('updateStatus ' , updateStatus);
    cb(updateStatus);
  });
};

//getSettings
  //for client to populate state { interests, frequency, isActive }
const getSettings = (req, res) => {
  const { userId } = req.body;
  Platform_User.findAll({
    where: {
      userId,
    },
  }).then(userSettings => {
    console.log('userSettings ' , userSettings);
    res.send(userSettings);
  });
};

//requestPlatformLogin
  //for client to login to a platform { boolean }
const requestPlatformLogin = (req, res) => {
  //make a call to social media manager
};

module.exports = {
  getActiveOverDueNext,
  updateDueNext,
  getSettings,
  requestPlatformLogin,
};