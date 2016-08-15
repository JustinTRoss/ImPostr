require('es6-promise').polyfill();
const Promise = require('bluebird');
const fetch = require('isomorphic-fetch');
const config = require('../../config/config');
const Twitter = require('twitter');
const btoa = require('btoa');
// Promise.promisifyAll(Twitter);

module.exports = {
  getUrlByTopic,
  postUrlToTwitter,
};

/**********PUBLIC**********/

function getUrlByTopic(setting, topic, cb) {
  const client = createClient(setting.token, setting.tokenSecret);
  client.get('search/tweets', {
    q: topic,
    lang: 'en',
    result_type: 'popular',
    count: 100,
  }, (err, tweets, res) => {
    if (err) {
      console.error(err, 'error getting url by topic');
    } else {
      let tweetUrls = tweets.statuses.filter(tweetObj => tweetObj.entities.urls.length > 0)
        .map(tweetUrlObj => tweetUrlObj.entities.urls[0].expanded_url);
      cb(tweetUrls[0] ? tweetUrls[0] : ['http://attackofthecute.com/popular.php']);
    }
  });
};

function postUrlToTwitter(setting, url) {
  const client = createClient(setting.token, setting.tokenSecret);
  client.post('statuses/update', {
    status: url,
  }, (err, tweet, res) => console.log('err', err, 'tweet', tweet, 'res', res));
};

// function getUrlByTopic(setting, topic) {
//   const client = createClient(setting.token, setting.TokenSecret);
//   client.getAsync('search/tweets', {
//     q: topic,
//     lang: 'en',
//     result_type: 'popular',
//     count: 100,
//   })
//   .then(tweets => console.log(tweets))
//   .catch(err => console.error(err));
// };

// function postUrlToTwitter(setting, url) {
//   const client = createClient(setting.token, setting.tokenSecret);
//   client.postAsync('statuses/update', {
//     status: url,
//   })
//   .then(res => console.log(res));
// }

/**********PRIVATE**********/

function getNewBearerToken() {
  const bearerTokenCreds = `${config.twitterConsumerKey}:${config.twitterConsumerSecret}`;
  const encodedBearerTokenCreds = btoa(bearerTokenCreds);

  fetch('https://api.twitter.com/oauth2/token?grant_type=client_credentials', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${encodedBearerTokenCreds}`,
      'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  })
  .then(res => res.json())
  .then(bearerToken => config.twitterBearerToken = bearerToken)
  .catch(err => console.error(err));
}

function createClient(accessToken, accessTokenSecret) {
  return new Twitter({
    consumer_key: config.twitterConsumerKey,
    consumer_secret: config.twitterConsumerSecret,
    access_token_key: accessToken,
    access_token_secret: accessTokenSecret,
  });
};
// function getUrlbyTopic(req, res) => {
//   const topic = req.body.topic || 'facebook';
//   const sentiment = req.body.sentiment || ':)';
//   fetch(`https://api.twitter.com/1.1/search/tweets.json?q=${topic}&lang=en&result_type=popular&count=100`, { 
//     headers: {
//       'Authorization': 'bearer AAAAAAAAAAAAAAAAAAAAADBMwQAAAAAA9vxtpYpYao2anTI8CmGUhN3%2BEuA%3DCs2SH8SG9iYBRAQwnxhg0RSLNIitI6w70SBinwON9hMOZjpmNl',
//       'content-type': 'application/json',
//     },
//   })
//   .then(res => res.json())
//   .then(data => {
//     const tweets = Object.assign({}, data);
//     console.log(tweets);
//     let tweetUrls = data.statuses.filter(tweetObj => tweetObj.entities.urls.length > 0)
//       .map(tweetUrlObj => tweetUrlObj.entities.urls[0].expanded_url);
//     tweetUrls = tweetUrls[0] ? tweetUrls : ['http://attackofthecute.com/popular.php'];
//     console.log(tweets);
//     res.send(tweetUrls);
//   })
//   .catch(err => res.send(err));
// };


// const createNonce = () => {
//   let text = '';
//   const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   for (let i = 0; i < 32; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   text = window.btoa(text).replace(/\+/g, '0').replace(/\//g, '0');
//   return text;
// };
