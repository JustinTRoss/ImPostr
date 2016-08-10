// OPTION A: check on certain intervals if a post is overdue
  // get overdue active posts
  // send to respective microservice to post
  // remove all overdue posts

//import { getExpiredActive, removeExpired } from post.controller

//import { postOnPlatforms } from (social media platforms)

const CronJob = require('cron').CronJob;
const queueMonitor = new CronJob('* * * * * *', () => {
  //getExpiredActive
    //iterate over them all
      // postOnPlatforms
  //removeExpired

}, null, true, 'America/Los_Angeles');


module.exports = {
  queueMonitor,
};
