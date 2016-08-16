const Post = require('./post.model');

//getExpiredActive
  //for worker to service
const getExpiredActive = () => {
  // untested, but this should update posts that are returned below
  Post.update(
    {
      posted: true,
    },
    {
      where:{
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
      // Only destroy posts that were not posted
      $or: [{ posted: false }, { posted: null }],
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
      userUserId: 7,
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
  getUser,
  getUserPostHistory,
};
