process.env.NODE_ENV = 'test';

const { expect } = require('chai');

const User = require('../../../server/users/user.model');
const {
  checkJWT,
  userLogout,
  userSignup,
  userLogin,
} = require('../../../server/users/user.controller');

describe('user.controller functions', () => {
  describe('checkJWT', () => {
    beforeEach((done) => {
      const testUser = {
        userId: 4,
        username: 'Matt',
        password: '123',
      };

      User.sync({ force: true })
        .then(() => User.create(testUser))
        .then(() => { done(); });
    });

    it('should call res.json with specified userId and token', (done) => {
      const req = {
        headers: {
          authorization: 'token abc123',
        },
        user: {
          userId: 4,
        },
      };

      const res = {
        json: (userCreds) => {
          expect(userCreds.userId).to.equal(req.user.userId);
          expect(userCreds.token).to.equal(req.headers.authorization.split(' ')[1]);
          done();
        },
      };

      checkJWT(req, res);
    });
  });

  describe('userLogout', () => {
    beforeEach((done) => {
      const testUser = {
        userId: 4,
        username: 'Matt',
        password: '123',
      };

      User.sync({ force: true })
        .then(() => User.create(testUser))
        .then(() => { done(); });
    });

    it('should call res.json with the specified userId and storedState', (done) => {
      const req = {
        body: {
          user: {
            userId: 4,
          },
          storedState: 'state',
        },
      };
      const res = {
        json: (userState) => {
          expect(userState.userId).to.equal(req.body.user.userId);
          expect(userState.storedState).to.equal(req.body.storedState);
          done();
        },
      };

      userLogout(req, res);
    });
  });

  describe('userSignup', () => {
    beforeEach((done) => {
      const testUser = {
        userId: 4,
        username: 'Matt-tastic',
        password: '123456789',
      };

      User.sync({ force: true })
        .then(() => User.create(testUser))
        .then(() => { done(); });
    });

    it('if called with a password or username less than 8 chars should call res.send with an error object', (done) => {
      const req = {
        body: {
          username: 'Mat',
          password: 'abc',
        },
      };

      const res = {
        status: (code) => {
          expect(code).to.equal(500);
          done();
        },
        send: () => {},
      };

      userSignup(req, res);
    });

    it('if called with a password or username less than 8 chars should call res.status with 500', (done) => {
      const req = {
        body: {
          username: 'Mat',
          password: 'abc',
        },
      };

      const res = {
        status: () => {},
        send: (status) => {
          expect(status).to.deep.equal({ status: false });
          done();
        },
      };

      userSignup(req, res);
    });

    it('if successfully called then should call res.json with the token', (done) => {
      const req = {
        body: {
          username: 'Matt-is-the-man',
          password: 'abcd1234',
        },
      };

      const res = {
        json: (credentials) => {
          expect(credentials.token).to.equal('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.QNEFXYc6TcX5yU1_teL2sfpJIB8s51GboYkUb5x5wmc');
          done();
        },
      };

      userSignup(req, res);
    });

    it('if called with a password and username greater than 8 chars should create an account', (done) => {
      const req = {
        body: {
          username: 'Matt-is-the-man',
          password: 'abcd1234',
        },
      };

      const res = {
        json: () => {
          User.findOne({
            where: {
              username: 'Matt-is-the-man',
            },
          }).then(user => {
            expect(user.dataValues.username).to.equal('Matt-is-the-man');
            done();
          });
        },
      };

      userSignup(req, res);
    });

    it('if called with username that already exists should call res.status of 500', (done) => {
      const req = {
        body: {
          username: 'Matt-tastic',
          password: 'abcd1234',
        },
      };

      const res = {
        status: (code) => {
          expect(code).to.equal(500);
          done();
        },
        send: () => {},
      };

      userSignup(req, res);
    });

    it('if called with username that already exists should call res.send with { status: false }', (done) => {
      const req = {
        body: {
          username: 'Matt-tastic',
          password: 'abcd1234',
        },
      };

      const res = {
        status: () => {},
        send: (status) => {
          expect(status).to.deep.equal({ status: false });
          done();
        },
      };

      userSignup(req, res);
    });

    it('if called with username that already exists shouldnt create an instance in the db', (done) => {
      const req = {
        body: {
          username: 'Matt-tastic',
          password: 'abcd1234',
        },
      };

      const res = {
        status: () => {},
        send: () => {
          User.findAll()
            .then(users => {
              expect(users.length).to.equal(1);
              done();
            });
        },
      };

      userSignup(req, res);
    });
  })
});