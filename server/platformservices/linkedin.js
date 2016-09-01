const Setting = require('../settings/setting.model');

const postToLinkedIn = ({ token, message }) => {
  let messageObject = {
    comment: 'Awesome Content!',
    content: {
      title: `Check this out!`,
      description: `Great Content!`,
      'submitted-url': message,
      'submitted-image-url': 'https://golang.org/doc/gopher/frontpage.png',
    },
    visibility: {
      code: 'anyone',
    },
  };
  return fetch(`https://api.linkedin.com/v1/people/~/shares?oauth2_access_token=${token}&format=json`, {
    method: 'POST',
    body: JSON.stringify(messageObject),
    headers: new Headers({
      'Content-Type': 'application/json',
      'x-li-format': 'json',
    }),
  })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.log(err));
};

module.exports = {
  postToLinkedIn,
};
