require('es6-promise').polyfill();
const Promise = require('bluebird');
const fetch = require('isomorphic-fetch');
const config = require('../../config/config');
const Twitter = require('twitter');
const btoa = require('btoa');
Promise.promisifyAll(Twitter.prototype);

module.exports = {
  getUrlByTopic,
  postToTwitter,
};

/**********PUBLIC**********/
 // source:twitterfeed
function getUrlByTopic(topic) {
  const client = createAppClient();
  return client.getAsync('search/tweets', {
    q: `"${topic}" filter:links`,
    lang: 'en',
    result_type: 'popular',
    count: 100,
  })
  .then(tweets => {
    const tweetUrls = tweets.statuses.filter(tweetObj => tweetObj.entities.urls.length > 0)
      .map(tweetUrlObj => tweetUrlObj.entities.urls[0].expanded_url);
    return tweetUrls[0] ? tweetUrls[0] : 'http://attackofthecute.com/popular.php';
  })
  .catch(err => console.error(err));
}

function postToTwitter(setting, url) {
  const client = createClient(setting.token, setting.tokenSecret);
  client.postAsync('statuses/update', {
    status: url,
  })
  .then((tweet, res) => console.log('tweet', tweet, 'res', res));
}

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
  .then(bearerToken => console.log(config.twitterBearerToken = bearerToken))
  .catch(err => console.error(err));
}

function createClient(accessToken, accessTokenSecret) {
  return new Twitter({
    consumer_key: config.twitterConsumerKey,
    consumer_secret: config.twitterConsumerSecret,
    access_token_key: accessToken,
    access_token_secret: accessTokenSecret,
  });
}

function createAppClient() {
  return new Twitter({
    consumer_key: config.twitterConsumerKey,
    consumer_secret: config.twitterConsumerSecret,
    bearer_token: config.twitterBearerToken,
  });
}

// const createNonce = () => {
//   let text = '';
//   const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   for (let i = 0; i < 32; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   text = window.btoa(text).replace(/\+/g, '0').replace(/\//g, '0');
//   return text;
// };
