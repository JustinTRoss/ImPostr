const Post = require('./post.model');
const Setting = require('../settings/setting.model');
const Promise = require('bluebird');
Promise.promisifyAll(require('pg'));

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
 * POST /post/addNewFromUser
 * @param  {object} req { body: { post: { date: [dateObj], time: [dateObj], message: [string], facebook: [bool], linkedin: [bool], twitter: [bool] }}, user: {userId: [number]}}
 * @param  {object} res body: { status: [bool] }
 */
const addNewFromUser = (req, res) => {
  const { date, time, message, facebook, linkedin, twitter } = req.body.post;
  const { userId } = req.user;
  const expires = new Date(`${date.split('T')[0]}T${time.split('T')[1]}`);

  const shouldPostOnPlatform = [facebook, linkedin, twitter];
  const platformsToAddMessage = ['facebook', 'linkedin', 'twitter'].filter((platform, i) => shouldPostOnPlatform[i]);

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

  return getPostFields(platformsToAddMessage).done(results => {
    return Post.bulkCreate(results).then((status) => {
      if (status.length) {
        res.json({ status: true });
      } else {
        res.json({ status: false });
      }
    });
  });
};

/**
 * POST /post/toggleIsActive
 * @param  {object} req { body: { postId: [number], isActive: [bool] }}
 * @param  {object} res body: { status: [bool] }
 */
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
      res.json({ status: true });
    } else {
      res.json({ status: false });
    }
  });
};

/**
 * GET /post/getUser
 * @param  {object} req { user: {userId: [number]}}
 * @param  {object} res body: { queue: [array] }
 */
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

/**
 * GET /post/getUserPostHistory
 * @param  {object} req { user: {userId: [number]}}
 * @param  {object} res body: { history: [array] }
 */
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
