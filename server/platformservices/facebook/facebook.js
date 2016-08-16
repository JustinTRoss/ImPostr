const graph = require('fbgraph');

const postToFacebook = ({ message, token }, cb) => {
  const post = { message };
  graph.setAccessToken(token);
  graph.post('/feed', post, (err, res) => {
    if (err) { cb(err); }
    if (!err) { cb(res); }
  });
};

module.exports = {
  postToFacebook,
};
