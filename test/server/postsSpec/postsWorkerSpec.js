process.env.NODE_ENV = 'test';

const { expect } = require('chai');

const app = require('../../../server/server');
const Post = require('../../../server/posts/post.model');
const User = require('../../../server/users/user.model');
const { getExpiredActive, removeExpired, addNew } = require('../../../server/posts/post.controller');

describe('post.controller', () => {
  describe('queueMonitor work functions', () => {
    beforeEach((done) => {
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
        .then(() => { done(); });
    });

    describe('getExpiredActive()', () => {
      it('should resond with only the post that both expired and active', (done) => {
        Post.findAll().then(posts => {
          expect(posts.length).to.equal(4);
        }).then(() => getExpiredActive())
          .then(posts => {
            expect(posts.length).to.equal(1);
            expect(posts[0].message).to.equal('This is an active post that expired yesterday');
            done();
          });
      });

      it('should toggle posted field on the post that both expired and active', (done) => {
        Post.findAll()
          .then(posts => { expect(posts.length).to.equal(4); })
          .then(() => getExpiredActive())
          .then(() => {
            return Post.findAll({
              where: {
                posted: true,
              },
            });
          })
          .then(posts => {
            expect(posts.length).to.equal(1);
            expect(posts[0].message).to.equal('This is an active post that expired yesterday');
            done();
          });
      });
    });

    describe('removeExpired()', () => {
      it('should remove posts that are both expired and not posted', (done) => {
        removeExpired()
          .then(status => { expect(status).to.equal(2); })
          .then(() => {
            return Post.findAll().then(posts => {
              expect(posts.length).to.equal(2);
              expect(posts[0].dataValues.message).to.equal('This is an active post that expires tommorrow');
              expect(posts[1].dataValues.message).to.equal('This is an inactive post that expires tommorrow');
              done();
            });
          });
      });
    });
  });

  describe('postGenerator worker posts functions', () => {
    beforeEach((done) => {
      const testUser = {
        userId: 4,
        username: 'Matt',
        password: '123',
      };

      User.sync({ force: true })
        .then(() => User.create(testUser))
        .then(() => Post.sync({ force: true }))
        .then(() => { done(); });
    });

    describe('addNew()', () => {
      it('should append a record to the posts table and maintain the same field values', (done) => {
        const testPost = {
          platform: 'facebook',
          token: 'abc123',
          tokenSecret: 'tokensecret123',
          isActive: true,
          message: 'This is an active post that expired yesterday',
          expires: new Date('2016-08-23T00:21:21.450Z'),
          userUserId: 4,
          posted: false,
        };

        addNew(testPost)
          .then(() => Post.findAll())
          .then(posts => {
            expect(posts.length).to.equal(1);
            expect(posts[0].dataValues.message).to.equal(testPost.message);
            expect(posts[0].dataValues.platform).to.equal(testPost.platform);
            done();
          });
      });
    });
  });
});
