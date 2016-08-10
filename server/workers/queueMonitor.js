// OPTION A: check on certain intervals if a post is overdue
  // get overdue active posts
  // send to respective microservice to post
  // 

//import { getActiveOverDueNext, updateDueNext } from user_platforms.controller

//import { fetchUrl } from Twitter Microservice

//import { addNew } from post.controller

const CronJob = require('cron').CronJob;
const queueMonitor = new CronJob('* * * * * *', () => {


}, null, true, 'America/Los_Angeles');


module.exports = {
  queueMonitor,
};
