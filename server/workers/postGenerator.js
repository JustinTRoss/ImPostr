// OPTION A (naive): check on certain intervals
  //getActiveOverDueNext
    //fetchUrl for interests array
    //generate messageObject
    //addNew(messageObject)
    //updateDueNext(platform_userId, new Date(new Date() + timeInterval))

const { getActiveOverDueNext, updateDueNext } = require('../settings/setting.controller');
const { addNew } = require('../posts/post.controller');

//import { fetchUrl } from Twitter Microservice
//
const fetchUrl = (interests, cb) => {
  const topic = interests[ Math.floor(interests.length * Math.random()) ];
  cb(`www.google.com?${topic}`);
};

const CronJob = require('cron').CronJob;

const postGenerator = new CronJob('*/5 * * * * *', () => {
  getActiveOverDueNext(users => {
    users.forEach(user => {
      const date = new Date(); 
      const dueNext = new Date(date.setTime(date.getTime() + user.interval * 86400000));
      updateDueNext(user.settingId, dueNext, updateDueNextStatus => {
        console.log('user due next status updated');
      });

      fetchUrl(user.interests, url => {
        const platform = user.platform;
        const isActive = true;
        const message = url;
        const expires = new Date(date.setTime(date.getTime() + 3 * 86400000));
        const userUserId = user.userUserId;

        addNew({
          platform,
          isActive,
          message,
          expires,
          userUserId,
        }, addNewPostStatus => {
          console.log('new post added');
        });
      });
    });
  });
}, null, true, 'America/Los_Angeles');


module.exports = {
  postGenerator,
};
