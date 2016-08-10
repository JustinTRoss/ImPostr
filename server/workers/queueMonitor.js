// OPTION A: check on certain intervals if a post is overdue
  // get overdue active posts
  // send to respective microservice to post
  // remove all overdue posts

//import { getExpiredActive, removeExpired } from post.controller

//import { postOnPlatforms } from (social media platforms)

// const CronJob = require('cron').CronJob;
// const queueMonitor = new CronJob('* * * * * *', () => {
  //getExpiredActive
    //iterate over them all
      // postOnPlatforms
  //removeExpired

// }, null, true, 'America/Los_Angeles');


// module.exports = {
//   queueMonitor,
// };

// queueMonitor gets all postQueue items
//              filters for items with current time past postDate
//              .then removes those from corresponding users' queues
//              .then sends {platform, token, url} to appropriate platform api server for posting

// queueMonitor gets all deleteQueue items
//              filters for items with current time past postDate
//              .then removes those from corresponding users' queues

const CronJob = require('cron').CronJob;




const postQueue = [
  {
    postId: 0,
    platform: 'facebook',
    token: '8675309',
    url: 'hackreaction.com',
    postDate: 7,
  },
  {
    postId: 1,
    platform: 'linkedIn',
    token: 'abc123u',
    url: 'justin.today',
    postDate: 12,
  }
];

const deleteQueue = [
  {
    postId: 2,
    platform: 'facebook',
    token: '8675309',
    url: 'hackreaction.com',
    postDate: 14,
  },
  {
    postId: 3,
    platform: 'linkedIn',
    token: 'abc123u',
    url: 'justin.today',
    postDate: 9,
  }
];

let counter = 0;

const test = new CronJob('* * * * * *', () => {
  counter++;
  console.log(counter);

  for (let i = 0; i < postQueue.length; i++) {
    if (postQueue[i].postDate <= counter) {
      console.log(postQueue.splice(i, 1));

    }
  }
  for (let i = 0; i < deleteQueue.length; i++) {
    console.log(counter);
    if (deleteQueue[i].postDate <= counter) {
      console.log(deleteQueue.splice(i, 1));
    }
  }
}, null, true, 'America/Los_Angeles');

module.exports = test;
