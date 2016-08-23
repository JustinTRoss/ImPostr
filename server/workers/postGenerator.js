const { getActiveOverDueNext, updateDueNext } = require('../settings/setting.controller');
const { addNew } = require('../posts/post.controller');
const { getUrlByTopic } = require('../platformServices/TwitterApi/twitter.controller');

const CronJob = require('cron').CronJob;

const postGenerator = new CronJob('* */5 * * * *', () => {
  return getActiveOverDueNext()
  .then(settings => {
    settings.forEach(settingObj => {
      const { settingId, platform, token, tokenSecret, userUserId, interval, interests } = settingObj;
      const daysTillNext = 7 / interval;
      const currentDate = new Date();
      const MILLISECOND_TO_DAY = 86400000;
      const dueNext = new Date(currentDate.setTime(currentDate.getTime() + daysTillNext * MILLISECOND_TO_DAY));

      // Update dueNext value for user's settings entry
      updateDueNext(settingId, dueNext);
      const interestAry = interests ? interests.split(/\s*,\s*/) : ['matriarchy'];
      const topic = interestAry[Math.floor((interestAry.length + 1) * Math.random())];
      const isActive = true;
      const datePost = new Date();
      const NUM_DAYS = 3;
      const expires = new Date(datePost.setTime(datePost.getTime() + NUM_DAYS * MILLISECOND_TO_DAY));
      const posted = false;

      // Retrieve a URL from twitter to create post with
      return getUrlByTopic(topic)
      .then(message => {
        // Create a post record
        return addNew({
          platform,
          token,
          tokenSecret,
          isActive,
          message,
          expires,
          posted,
          userUserId,
        });
      })
      .catch(err => console.error(err));
    });
  });
}, null, true, 'America/Los_Angeles');


module.exports = {
  postGenerator,
};
