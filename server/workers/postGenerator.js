// OPTION A (naive): check on certain intervals
  //getActiveOverDueNext
    //fetchUrl for interests array
    //generate messageObject
    //addNew(messageObject)
    //updateDueNext(platform_userId, new Date(new Date() + timeInterval))

const { getActiveOverDueNext, updateDueNext } = require('../settings/setting.controller');
const { addNew } = require('../posts/post.controller');

//import { fetchUrl } from Twitter Microservice

const fetchUrl = (interests, cb) => {
  const topic = interests[ Math.floor(interests.length * Math.random()) ];
  cb(`www.google.com?${topic}`);
};

const CronJob = require('cron').CronJob;

const postGenerator = new CronJob('*/5 * * * * *', () => {
  getActiveOverDueNext(users => {
    users.forEach(user => {
      const { settingId, platform, token, userUserId, interval } = user;

      const dateSettings = new Date(); 
      const MILLISECOND_TO_DAY = 86400000;
      const dueNext = new Date(dateSettings.setTime(dateSettings.getTime() + interval * MILLISECOND_TO_DAY));
      updateDueNext(settingId, dueNext, updateStatus => {
        //if doesn't equal [1] then throw error
      });

      fetchUrl(user.interests, url => {
        const isActive = true;
        const message = url;
        const datePost = new Date(); 
        const NUM_DAYS = 3;
        const expires = new Date(datePost.setTime(datePost.getTime() + NUM_DAYS * MILLISECOND_TO_DAY));

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
