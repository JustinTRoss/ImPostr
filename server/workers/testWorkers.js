const CronJob = require('cron').CronJob;

const { addNew } = require('../posts/post.controller');

let counter = 0;
const fakePostGenerator = new CronJob('* * * * * *', () => {
  //process posts
  if (true) {
    

  };

  //create posts
  if (false) {
    counter++;

    const platforms = ['facebook', 'twitter', 'linkedin'];
    const platform = platforms[counter % platforms.length];

    const isActiveOptions = [true, false];
    const isActive = isActiveOptions[counter % isActiveOptions.length];

    const topics = ['whales', 'pizza', 'tennis', 'chocolate', 'politics', 'patriarchy'];
    const topic = topics[counter % topics.length];

    const date = new Date();
    const NUM_DAYS = 0;
    const MILLISECOND_TO_DAY = 86400000;
    const expires = new Date(date.setTime(date.getTime() + NUM_DAYS * MILLISECOND_TO_DAY));

    const post = {
      platform,
      token: '123abc',
      isActive,
      message: `yolo?${topic}`,
      expires,
      userUserId: 19,
    };

    addNew(post, addNewPostStatus => {
      // test post against error
    });
  }
}, null, true, 'America/Los_Angeles');

module.exports = {
  fakePostGenerator,
};
