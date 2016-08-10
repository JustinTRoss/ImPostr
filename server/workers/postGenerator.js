const CronJob = require('cron').CronJob;

//get url function
const getUrl = (interests) => {
  return 'www.google.com';
};



const testUser = {

};

const test = new CronJob('* * * * * *', () => {
  console.log('You will see this message every second');
}, null, true, 'America/Los_Angeles');

//OPTION A (naive): check on certain intervals
//iterate over the User_Platform join
//  if a post generation is due
//    fetch url content based upon interests
//    write message to the post queue
//    update field for post due date

//OPTION B (more efficient): when a user logs in or creates a post
// schedule a job with that user id and a date object

module.exports = {
  test,
};


// var CronJob = require('cron').CronJob;
// var job = new CronJob(new Date(), function() {
//   /* runs once at the specified date. */
//   }, function () {
//     /* This function is executed when the job stops */
//   },
//   true, /* Start the job right now */
//   timeZone /* Time zone of this job. */
// );