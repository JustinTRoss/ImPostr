const CronJob = require('cron').CronJob;

const { addNew } = require('../posts/post.controller');

let counter = 0;
const fakePostGenerator = new CronJob('* * * * * *', () => {
  counter++;
  addNew({
    platform: 'facebook',
    isActive: true,
    message: `yolo${counter}`,
    expires: new Date(),
  }, addNewPostStatus => {
    console.log('new post added')
    // console.log('addNewPostStatus', addNewPostStatus);
  });
}, null, true, 'America/Los_Angeles');

module.exports = {
  fakePostGenerator,
};
