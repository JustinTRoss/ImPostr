const graph = require('fbgraph');

const postOnFacebook = ({ message, token }, cb) => {
  const post = { message };
  graph.setAccessToken(token);
  graph.post('/feed', post, (err, res) => {
    if (err) { cb(err); }
    if (!err) { cb(res); }
  });
};

module.exports = {
  postOnFacebook,
};
