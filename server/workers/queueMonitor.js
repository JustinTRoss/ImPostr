const CronJob = require('cron').CronJob;

const { getExpiredActive, removeExpired } = require('../posts/post.controller');

const { postToFacebook } = require('../platformservices/facebook/facebook');
const { postToTwitter } = require('../platformservices/TwitterApi/twitter.controller');
const { postToLinkedIn } = require('../platformservices/linkedin');

// Post to appropriate platform
const postOnPlatforms = (post) => {
  switch (post.platform) {
    case 'twitter':
      return postToTwitter(post);
    case 'facebook':
      return postToFacebook(post);
    case 'linkedin':
      return postToLinkedIn(post);
    default:
      return null;
  }
};

// Find posts that require action
const queueMonitor = new CronJob('*/15 * * * * *', () => {
  return getExpiredActive()
  .then(posts => {
    posts.forEach(post => {
      postOnPlatforms(post);
    });
  })
  // .then(removeExpired())
  .catch(err => console.error(err));
}, null, true, 'America/Los_Angeles');

module.exports = {
  queueMonitor,
};
