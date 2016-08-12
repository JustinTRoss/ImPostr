// OPTION A: check on certain intervals if a post is overdue
  // getExpiredActive
  //   iterate over them all
  //     postOnPlatforms
  // removeExpired
  

  //add data fields fully populate posts (token and user id)
  

const { getExpiredActive, removeExpired } = require('../posts/post.controller');

//requie { postOnPlatforms } = require(social media platforms)
const postOnPlatforms = (post, cb) => {
  const status = 'Post Succesful';
  cb(status, post);
};

const CronJob = require('cron').CronJob;

const queueMonitor = new CronJob('*/5 * * * * *', () => {
  getExpiredActive(posts => {
    posts
      .map(post => post.dataValues)
      .forEach(post => {
        postOnPlatforms(post, status => {
          console.log(status, post);
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
