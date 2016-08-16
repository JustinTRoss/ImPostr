const Post = require('./post.model');
const Setting = require('../settings/setting.model');
const Promise = require('bluebird');
Promise.promisifyAll(require('pg'));

//getExpiredActive
  //for worker to service
const getExpiredActive = () => {
  // untested, but this should update posts that are returned below
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

//removeExpired
  //for worker to prevent reprocessing servived posts
const removeExpired = () => {
  return Post.destroy({
    where: {
      expires: {
        $lt: new Date(),
      },
      posted: false || null,
    },
  });
};

//addNew
  //for worker to add a post
const addNew = ({ platform, token, tokenSecret, isActive, message, expires, userUserId }) => {
  return Post.create({
    platform,
    token,
    tokenSecret,
    isActive,
    message,
    expires,
    userUserId,
  });
};

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
            userUserId: userId,
          };
        }
      });
    }));
  };

  getPostFields(platforms).done(results => {
    Post.bulkCreate(results).then((status) => {
      //some sort of status validation
      res.send(status);
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
  }).then(updateStatus => {
    res.send(updateStatus);
  });
};

//getUser
  //for client to get all unserviced posts when user logs in
const getUser = (req, res) => {
  let { userId } = req.user;
  Post.findAll({
    where: {
      userUserId: userId,
    },
  }).then(userPosts => {
    let justPosts = userPosts
      .map(post => post.dataValues)
      .filter(post => !!post.isActive);
    res.json({
      queue: justPosts,
    });
  });
};

const getUserPostHistory = (req, res) => {
  let { userId } = req.user;
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
