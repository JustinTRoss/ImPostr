const CronJob = require('cron').CronJob;

// fetch url content based upon interests
const getUrl = (interests) => {
  const topic = interests[Math.floor(Math.random())*interests.length]
  return `www.google.com?${topic}`;
};

//write message to the post queue
const writeMessage = (message) => {
  console.log(message);
};

// update field for post due date
const updateDueNext

const updateMessage = (user) => {

}

const users = {
  a: {
    interests: ['dogs', 'cats'],
    interval: 3,
    dueNext: 10,
  },
  b: {
    interests: ['pizza', 'elephants'],
    interval: 7,
    dueNext: 10,
  },

};

let counter = 0;

const test = new CronJob('* * * * * *', () => {
  counter++;

  for (let key in users) {
    if (users[key].dueNext <= counter) {
      users[key].dueNext += users[key].interval;
    }
  }


}, null, true, 'America/Los_Angeles');

//OPTION A (naive): check on certain intervals
//iterate over the User_Platform join
//  if a post generation is due
//    fetch url content based upon interests
//    write message to the post queue
//    update field for post due date

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