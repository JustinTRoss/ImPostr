// Import expired post handling functions
const { getExpiredActive, removeExpired } = require('../posts/post.controller');

// Import platform posting functions
const { postToFacebook } = require('../platformservices/facebook/facebook');
const { postToTwitter } = require('../platformservices/TwitterApi/twitter.controller');
const { postToLinkedIn } = require('../platformservices/linkedin');

// Post to appropriate platform
const postOnPlatforms = (post) => {
  console.log('posting on ', post.platform);
  switch (post.platform) {
    case 'twitter':
      return postToTwitter(post);
    case 'facebook':
      return postToFacebook(post);
    case 'linkedin':
      return postToLinkedIn(post);
    default:
      return;
  }
};

// Find posts that require action
const CronJob = require('cron').CronJob;
const queueMonitor = new CronJob('*/5 * * * * *', () => {
  return getExpiredActive()
  .then(posts => {
    posts.forEach(post => {
      postOnPlatforms(post);
    });
  })
  .then(removeExpired())
  .catch(err => console.error(err));
}, null, true, 'America/Los_Angeles');

module.exports = {
  queueMonitor,
};
