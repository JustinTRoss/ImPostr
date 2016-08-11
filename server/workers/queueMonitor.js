// OPTION A: check on certain intervals if a post is overdue
  // getExpiredActive
  //   iterate over them all
  //     postOnPlatforms
  // removeExpired

const { getExpiredActive, removeExpired } = require('../posts/post.controller');

//requie { postOnPlatforms } = require(social media platforms)
const postOnPlatforms = (post, cb) => {
  console.log(post);
  const status = 'good';
  cb(status);
};

const CronJob = require('cron').CronJob;

const queueMonitor = new CronJob('* * * * * *', () => {
  getExpiredActive(posts => {
    posts.forEach(post => {
      postOnPlatforms(post, status => {
        console.log(status);
      });
    });
  });
  removeExpired(status => {
    console.log('Posts removed: ', status);
  });
}, null, true, 'America/Los_Angeles');

module.exports = {
  queueMonitor,
};
