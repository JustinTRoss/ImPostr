process.env.NODE_ENV = 'test';

const sinon = require('sinon');
const rewire = require('rewire');
const chai = require('chai');
const expect = chai.expect;
const Sequelize = require('sequelize');


const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const app = require('../../server/server');
const sequelize = require('../../server/config/sequelize');

const Post = require('../../server/posts/post.model');
const User = require('../../server/users/user.model');

const { getExpiredActive, removeExpired } = require('../../server/posts/post.controller');

describe('post.controller', () => {
  before((done) => {
    const testUser = {
      userId: 4,
      username: 'Matt',
      password: '123',
    };

    const dateForYesterday = new Date();
    const dateForTomorrow = new Date();
    const MILLISECOND_TO_DAY = 86400000;
    const expiresYesterday = new Date(dateForYesterday.setTime(dateForYesterday.getTime() - 1 * MILLISECOND_TO_DAY));
    const expiresTommorrow = new Date(dateForTomorrow.setTime(dateForTomorrow.getTime() + 1 * MILLISECOND_TO_DAY));

    const testPosts = [
      {
        platform: 'facebook',
        token: 'abc123',
        tokenSecret: 'tokensecret123',
        isActive: true,
        message: 'This is an active post that expired yesterday',
        expires: expiresYesterday,
        userUserId: 4,
        posted: false,
      },
      {
        platform: 'linkedin',
        token: 'abc123',
        tokenSecret: 'tokensecret123',
        isActive: true,
        message: 'This is an active post that expires tommorrow',
        expires: expiresTommorrow,
        userUserId: 4,
        posted: false,
      },
      {
        platform: 'linkedin',
        token: 'abc123',
        tokenSecret: 'tokensecret123',
        isActive: false,
        message: 'This is an inactive post that expired yesterday',
        expires: expiresYesterday,
        userUserId: 4,
        posted: false,
      },
      {
        platform: 'linkedin',
        token: 'abc123',
        tokenSecret: 'tokensecret123',
        isActive: false,
        message: 'This is an inactive post that expires tommorrow',
        expires: expiresTommorrow,
        userUserId: 4,
        posted: false,
      },
    ];

    User.sync({ force: true })
      .then(() => User.create(testUser))
      .then(() => Post.sync({ force: true }))
      .then(() => Post.bulkCreate(testPosts))
      .then((status) => console.log('db set'))
      .then(() => { done(); });
  });

  after((done) => {
    //close db and express app
    done();
  });

  describe('local server actions', () => {
    describe('getExpiredActive()', () => {
      it('should resond with only the post that both expired and active', (done) => {
        getExpiredActive()
          .then(posts => {
            expect(posts.length).to.equal(1);
            expect(posts[0].message).to.equal('This is an active post that expired yesterday');
            done();
          });
      });

      it('should toggle posted field on the post that both expired and active', (done) => {
        Post.findAll({
          where: {
            posted: true,
          },
        }).then(posts => {
          expect(posts.length).to.equal(1);
          expect(posts[0].message).to.equal('This is an active post that expired yesterday');
          done();
        });
      });
    });

    describe('removeExpired()')
  });
});
