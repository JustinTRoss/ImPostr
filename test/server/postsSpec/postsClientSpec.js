process.env.NODE_ENV = 'test';

const { expect } = require('chai');

const Post = require('../../../server/posts/post.model');
const User = require('../../../server/users/user.model');
const { addNewFromUser, toggleIsActive, getUser, getUserPostHistory } = require('../../../server/posts/post.controller');

describe('post.controller client functions', () => {
  describe('addNewFromUser', () => {
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

    it('res.send should be called with {status: true}', (done) => {
      const req = {
        body: {
          post: {
            date: '2016-08-27T00:00:00.000Z',
            time: '2016-08-23T00:21:21.450Z',
            message: 'Here is a message to post!',
            facebook: true,
            linkedin: true,
            twitter: false,
          },
        },
        user: {
          userId: 4,
        },
      };

      const res = {};
      res.send = (response) => {
        expect(response).to.deep.equal({ status: true });
        done();
      };

      addNewFromUser(req, res);
    });

    it('expect the post objects be written to the db', (done) => {
      const req = {
        body: {
          post: {
            date: '2016-08-27T00:00:00.000Z',
            time: '2016-08-23T00:21:21.450Z',
            message: 'Here is a message to post!',
            facebook: true,
            linkedin: true,
            twitter: false,
          },
        },
        user: {
          userId: 4,
        },
      };

      const res = {};
      res.send = () => {
        Post.findAll()
          .then(posts => {
            expect(posts.length).to.equal(2);
            expect(posts[0].message).to.equal('Here is a message to post!');
            expect(posts[0].platform).to.equal('facebook');
            expect(posts[1].message).to.equal('Here is a message to post!');
            expect(posts[1].platform).to.equal('linkedin');
            done();
          });
      };

      addNewFromUser(req, res);
    });
  });

  describe('toggleIsActive', () => {
    beforeEach((done) => {
      const testUser = {
        userId: 4,
        username: 'Matt',
        password: '123',
      };

      const testPosts = [
        {
          platform: 'facebook',
          token: 'abc123',
          tokenSecret: 'tokensecret123',
          isActive: true,
          message: 'This is an active post that expired yesterday',
          expires: new Date(),
          userUserId: 4,
          posted: false,
        },
        {
          platform: 'linkedin',
          token: 'abc123',
          tokenSecret: 'tokensecret123',
          isActive: true,
          message: 'This is an active post that expires tommorrow',
          expires: new Date(),
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

    it('res.send should be called with { status: true }', (done) => {
      const req = {
        body: {
          postId: 1,
          isActive: false,
        },
      };

      const res = {};
      res.send = (response) => {
        expect(response).to.deep.equal({ status: true });
        done();
      };

      toggleIsActive(req, res);
    });

    it('expect postId 1 isActive to be set to false', (done) => {
      const req = {
        body: {
          postId: 1,
          isActive: false,
        },
      };

      const res = {};
      res.send = () => {
        Post.findOne({
          where: {
            postId: 1,
          },
        }).then(post => {
          expect(post.isActive).to.equal(false);
          done();
        });
      };

      toggleIsActive(req, res);
    });
  });

  describe('getUser', () => {
    beforeEach((done) => {
      const testUsers = [
        {
          userId: 4,
          username: 'Matt',
          password: '123',
        },
        {
          userId: 5,
          username: 'Steven',
          password: '123',
        },
      ];

      const testPosts = [
        {
          platform: 'facebook',
          token: 'abc123',
          tokenSecret: 'tokensecret123',
          isActive: true,
          message: 'This the right user post',
          expires: new Date(),
          userUserId: 4,
          posted: false,
        },
        {
          platform: 'linkedin',
          token: 'abc123',
          tokenSecret: 'tokensecret123',
          isActive: true,
          message: 'This the right user post',
          expires: new Date(),
          userUserId: 4,
          posted: false,
        },
        {
          platform: 'linkedin',
          token: 'abc123',
          tokenSecret: 'tokensecret123',
          isActive: true,
          message: 'This the wrong user post',
          expires: new Date(),
          userUserId: 5,
          posted: false,
        },
      ];

      User.sync({ force: true })
        .then(() => User.bulkCreate(testUsers))
        .then(() => Post.sync({ force: true }))
        .then(() => Post.bulkCreate(testPosts))
        .then(() => { done(); });
    });

    it('should call res.json with posts for specified userId', (done) => {
      const req = {
        user: {
          userId: 4,
        },
      };

      const res = {};
      res.json = (json) => {
        expect(json.queue.length).to.equal(2);
        const isPost = json.queue.every(post => post.message === 'This the right user post');
        expect(isPost).to.equal(true);
        done();
      };

      getUser(req, res);
    });
  });

  describe('getUserPostHistory', () => {
    beforeEach((done) => {
      const testUsers = [
        {
          userId: 4,
          username: 'Matt',
          password: '123',
        },
        {
          userId: 5,
          username: 'Steven',
          password: '123',
        },
      ];

      const testPosts = [
        {
          platform: 'facebook',
          token: 'abc123',
          tokenSecret: 'tokensecret123',
          isActive: true,
          message: 'This the right user post',
          expires: new Date(),
          userUserId: 4,
          posted: true,
        },
        {
          platform: 'linkedin',
          token: 'abc123',
          tokenSecret: 'tokensecret123',
          isActive: true,
          message: 'This the wrong user post',
          expires: new Date(),
          userUserId: 4,
          posted: false,
        },
        {
          platform: 'linkedin',
          token: 'abc123',
          tokenSecret: 'tokensecret123',
          isActive: true,
          message: 'This the wrong user post',
          expires: new Date(),
          userUserId: 5,
          posted: false,
        },
      ];

      User.sync({ force: true })
        .then(() => User.bulkCreate(testUsers))
        .then(() => Post.sync({ force: true }))
        .then(() => Post.bulkCreate(testPosts))
        .then(() => { done(); });
    });

    it('should call res.json with post objects that are both posted = true and userId = userId', (done) => {
      const req = {
        user: {
          userId: 4,
        },
      };

      const res = {};
      res.json = (json) => {
        expect(json.history.length).to.equal(1);
        expect(json.history[0].message).to.equal('This the right user post');
        done();
      };

      getUserPostHistory(req, res);
    });
  });
});
