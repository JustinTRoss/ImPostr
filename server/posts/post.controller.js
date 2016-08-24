const Post = require('./post.model');
const Setting = require('../settings/setting.model');
const Promise = require('bluebird');
Promise.promisifyAll(require('pg'));

/**
 * for queueMonitor worker to monitor posts that are ready to post
 * @return {object} posts - promise object of an array of post objects
 */
const getExpiredActive = () => {
  Post.update(
    {
      posted: true,
    },
    {
      where: {
        isActive: true,
        expires: {
          $lt: new Date(),
        },
      },
    }
  );

  return Post.findAll({
    where: {
      isActive: true,
      expires: {
        $lt: new Date(),
      },
    },
  });
};

/**
 * for queueMonitor worker to monitor the queue and delete post objects that are not posted
 * @return {object} status - promise object of an array of the number of records destroyed
 */
const removeExpired = () => {
  return Post.destroy({
    where: {
      expires: {
        $lt: new Date(),
      },
      posted: false,
    },
  });
};

/**
 * for postGenerator worker to add new posts to the queue
 * @param  {object} post - { platform, token, tokenSecret, isActive, message, expires, posted, userUserId }
 * @return {object} post - promise object of value fields that were created in db write
 */
const addNew = (post) => {
  const { platform, token, tokenSecret, isActive, message, expires, posted, userUserId } = post;
  return Post.create({
    platform,
    token,
    tokenSecret,
    isActive,
    message,
    expires,
    posted,
    userUserId,
  });
};

/**
 * to let the user manually create a new post
 * @param  {object} req [description]
 * @param  {object} res [description]
 * @return {[type]}     [description]
 */
const addNewFromUser = (req, res) => {
  const { date, time, message, facebook, linkedin, twitter } = req.body.post;
  const { userId } = req.user;
  const expires = new Date(`${date.split('T')[0]}T${time.split('T')[1]}`);

  const shouldPostOnPlatform = [facebook, linkedin, twitter];
  const platforms = ['facebook', 'linkedin', 'twitter'].filter((platform, i) => shouldPostOnPlatform[i]);

  const getPostFields = (platforms) => {
    return Promise.all(platforms.map(platform => {
      return Setting.findOne({
        where: {
          userUserId: userId,
          platform,
        },
      }).then(setting => {
        if (setting && setting.token) {
          const { token, tokenSecret } = setting;
          return {
            platform,
            token,
            tokenSecret,
            isActive: true,
            message,
            expires,
            posted: false,
            userUserId: userId,
          };
        }
      });
    }));
  };

  return getPostFields(platforms).done(results => {
    return Post.bulkCreate(results).then((status) => {
      if (status.length) {
        res.send({ status: true });
      } else {
        res.send({ status: false });
      }
    });
  });
};

//toggleIsActive
// for client to update based on user input
const toggleIsActive = (req, res) => {
  const { postId, isActive } = req.body;
  Post.update({
    isActive,
  }, {
    where: {
      postId,
    },
  }).then(status => {
    if (status[0] === 1) {
      res.send({ status: true });
    } else {
      res.send({ status: false });
    }
  });
};

//getUser
  //for client to get all unserviced posts when user logs in
const getUser = (req, res) => {
  const { userId } = req.user;
  Post.findAll({
    where: {
      userUserId: userId,
    },
  }).then(userPosts => {
    const justPosts = userPosts
      .map(post => post.dataValues)
      .filter(post => !!post.isActive);
    res.json({
      queue: justPosts,
    });
  });
};

const getUserPostHistory = (req, res) => {
  const { userId } = req.user;
  Post.findAll({
    where: {
      posted: true,
      userUserId: userId,
    },
  })
    .then(historyArr => {
      res.json({
        history: historyArr,
      });
    })
    .catch(err => console.error('userposthistory error', err));
};

module.exports = {
  getExpiredActive,
  removeExpired,
  toggleIsActive,
  addNew,
  addNewFromUser,
  getUser,
  getUserPostHistory,
};
