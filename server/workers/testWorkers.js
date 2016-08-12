const CronJob = require('cron').CronJob;

const { addNew } = require('../posts/post.controller');

let counter = 0;
const fakePostGenerator = new CronJob('* * * * * *', () => {
  counter++;

  const platforms = ['facebook', 'twitter', 'linkedin'];
  const platform = platforms[counter % platforms.length];

  const isActiveOptions = [true, false];
  const isActive = isActiveOptions[counter % isActiveOptions.length];

  const topics = ['whales', 'pizza', 'tennis', 'chocolate', 'politics'];
  const topic = topics[counter % topics.length];

  const date = new Date(); 
  const expires = new Date(date.setTime(date.getTime() + 1 * 86400000));

  let post = {
    platform,
    isActive,
    message: `yolo?${topic}`,
    expires,
    userUserId: 8,
  };

  addNew(post, addNewPostStatus => {
    console.log('new post added')
  });
}, null, true, 'America/Los_Angeles');

module.exports = {
  fakePostGenerator,
};
