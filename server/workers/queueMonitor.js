// OPTION A: check on certain intervals if a post is overdue
  // getExpiredActive
  //   iterate over them all
  //     postOnPlatforms
  // removeExpired

const { getExpiredActive, removeExpired } = require('../posts/post.controller');

// import from fb
// import tw
const { postOnFacebook } = require('../platformservices/facebook/facebook');

const postOnPlatforms = (post, cb) => {
  if (post.platform === 'facebook') {
    postOnFacebook(post, status => {
      //do some status handling here
    });
  }
  const status = 'Post Succesful';
  cb(status, post);
};

const CronJob = require('cron').CronJob;

const queueMonitor = new CronJob('* */5 * * * *', () => {
  getExpiredActive(posts => {
    posts.forEach(post => {
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


// const { getExpiredActive, removeExpired } = require('../posts/post.controller');

// //requie { postOnPlatforms } = require(social media platforms)
// const postOnPlatforms = (post) => {
//   const status = 'Post Succesful';
//   switch (post.platform) {
//     case 'twitter':
//       //call twitter posting fn
//       return;
//     default:
//       return;
//   }
// };

// const CronJob = require('cron').CronJob;

// const queueMonitor = new CronJob('*/5 * * * * *', () => {
//   getExpiredActive()
//   .then(posts => {
//     posts.forEach(post => {
//       postOnPlatforms(post)
//     });
//   })
//   .then(removeExpired())
//   .catch(err => console.error(err));
// }, null, true, 'America/Los_Angeles');

// module.exports = {
//   queueMonitor,
// };
