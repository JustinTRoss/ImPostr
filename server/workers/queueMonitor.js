// OPTION A: check on certain intervals if a post is overdue
  // getExpiredActive
  //   iterate over them all
  //     postOnPlatforms
  // removeExpired

const { getExpiredActive, removeExpired } = require('../posts/post.controller');

//requie { postOnPlatforms } = require(social media platforms)

// import from fb
// import tw
// import from li

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
          //test status for an error
        });
      });
  });
  removeExpired(status => {
    //test status for an error
  });
}, null, true, 'America/Los_Angeles');

module.exports = {
  queueMonitor,
};
