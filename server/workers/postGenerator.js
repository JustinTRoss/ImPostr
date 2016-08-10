// OPTION A (naive): check on certain intervals
// iterate over the User_Platform join
//  if a post generation is due
//    fetch url content based upon interests
//    write message to the post queue
//    update field for post due date

//import { getActiveOverDueNext, updateDueNext } from user_platforms.controller

//import { fetchUrl } from Twitter Microservice

//import { addNew } from post.controller

const CronJob = require('cron').CronJob;
const postGenerator = new CronJob('* * * * * *', () => {
  //getActiveOverDueNext
    //fetchUrl for interests array
    //generate messageObject
    //addNew(messageObject)
    //updateDueNext(timeNow + interval)

}, null, true, 'America/Los_Angeles');


module.exports = {
  postGenerator,
};
