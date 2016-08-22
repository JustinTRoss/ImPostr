process.env.NODE_ENV = 'test';

const sinon = require('sinon');
const rewire = require('rewire');
const chai = require('chai');
const expect = chai.expect;

const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const app = require('../../server/server');
const db = require('../../server/config/sequelize');

const Post = require('../../server/posts/post.model');
const User = require('../../server/users/user.model');

// const { getExpiredActive, removeExpired } = require('../../server/posts/post.controller');

describe('post.controller', () => {
  before((done) => {
    const testUser = {
      userId: 4,
      username: 'Matt',
      password: '123',
    };

    const testPost = {
      platform: 'facebook',
      token: 'abc123',
      tokenSecret: 'tokensecret123',
      isActive: true,
      message: 'Hey Steven',
      expires: new Date(),
      userUserId: 4,
    };

    User.sync({ force: true })
      .then(() => User.create(testUser))
      .then(() => Post.sync({ force: true }))
      .then(() => Post.create(testPost))
      .then((status) => console.log(status))
      .then(() => { done(); });
  });

  describe('local server actions', () => {

    describe('getExpiredActive', () => {


      it('should resond with expiredActivePosts', (done) => {

        done();
      });
    });
  });
});
