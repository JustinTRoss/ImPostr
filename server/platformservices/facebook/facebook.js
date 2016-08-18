const graph = require('fbgraph');

const postToFacebook = ({ message, token }) => {
  const post = { message };
  graph.setAccessToken(token);
  graph.post('/feed', post, (err, res) => {
    if (err) {
      return err;
    }
    return res;
  });
};

module.exports = {
  postToFacebook,
};
