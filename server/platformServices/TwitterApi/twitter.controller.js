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
function getUrlByTopic(topic) {
  const client = createAppClient();
  return client.getAsync('search/tweets', {
    q: `"${topic}" filter:links`,
    lang: 'en',
    result_type: 'popular',
    count: 100,
  })
  .then(tweets => {
    console.log(tweets);
    const tweetUrls = tweets.statuses.filter(tweetObj => tweetObj.entities.urls.length > 0)
      .map(tweetUrlObj => tweetUrlObj.entities.urls[0].expanded_url);
    return tweetUrls[0] ? tweetUrls[0] : 'http://attackofthecute.com/popular.php';
  })
  .catch(err => console.error(err));
}

function postToTwitter(post) {
  const client = createClient(post.token, post.tokenSecret);
  client.postAsync('statuses/update', {
    status: post.message || 'I hope everyone is having a great day!',
  })
  .then((tweet, res) => console.log('tweet', tweet, 'res', res))
  .catch(err => console.error(err));
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
  .then(bearerToken => console.log('~~~~~~~~~>', config.twitterBearerToken = bearerToken))
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