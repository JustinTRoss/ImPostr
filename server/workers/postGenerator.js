// OPTION A (naive): check on certain intervals
  //getActiveOverDueNext
    //fetchUrl for interests array
    //generate messageObject
    //addNew(messageObject)
    //updateDueNext(platform_userId, new Date(new Date() + timeInterval))

const { getActiveOverDueNext, updateDueNext } = require('../settings/setting.controller');
const { addNew } = require('../posts/post.controller');
const { getUrlByTopic } = require('../platformServices/TwitterApi/twitter.controller');

const CronJob = require('cron').CronJob;

const postGenerator = new CronJob('*/5 * * * * *', () => {
  getActiveOverDueNext(settings => {
    settings.forEach(settingObj => {
      const { settingId, platform, token, tokenSecret, userUserId, interval } = settingObj;

      const dateSettings = new Date(); 
      const MILLISECOND_TO_DAY = 86400000;
      const dueNext = new Date(dateSettings.setTime(dateSettings.getTime() + daysTillNext * MILLISECOND_TO_DAY));
      updateDueNext(settingId, dueNext, updateStatus => {
        //if doesn't equal [1] then throw error
      });

      const topic = interests[ Math.floor(interests.length + 1 * Math.random()) ];
      const isActive = true;
      const datePost = new Date(); 
      const NUM_DAYS = 3;
      const expires = new Date(datePost.setTime(datePost.getTime() + NUM_DAYS * MILLISECOND_TO_DAY));
      
      getUrlByTopic(settingObj, topic, message => {
        addNew({
          platform,
          token,
          isActive,
          message,
          expires,
          userUserId,
        }, newPostStatus => {
            //throw error if not same fields
        });
      });
    });
  });
}, null, true, 'America/Los_Angeles');


module.exports = {
  postGenerator,
};
