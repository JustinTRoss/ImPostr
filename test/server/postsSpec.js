const sinon = require('sinon');
const rewire = require('rewire');
const chai = require('chai');
const expect = chai.expect;

const { imported } = require('../testServerDB');

const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const { getExpiredActive, removeExpired } = require('../../server/posts/post.controller');
const Post = require('../../server/posts/post.model');

describe('post.controller', () => {
  describe('local server actions', () => {

    describe('getExpiredActive', () => {
      const env = {};

      before((next) => {
        app.listen(3000, () => {
          console.log('App listening');
          next();
        });
      });

      after(() => {
        app.close();
      });


      it('should resond with expiredActivePosts', (done) => {

        done();
      });
    });
  });
});
