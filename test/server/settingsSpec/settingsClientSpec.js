process.env.NODE_ENV = 'test';

const { expect } = require('chai');

const User = require('../../../server/users/user.model');
const Setting = require('../../../server/settings/setting.model');
const { getSettings, updateSettings, requestPlatformLogout } = require('../../../server/settings/setting.controller');

describe('setting.controller client funciton', () => {
  describe('getSettings', () => {
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

      const testSettings = [
        {
          platform: 'facebook',
          token: 'abc123',
          tokenSecret: 'tokensecret123',
          isActive: true,
          interests: 'This is the right interests string',
          interval: 7,
          dueNext: new Date(),
          userUserId: 4,
        },
        {
          platform: 'linkedin',
          token: 'abc123',
          tokenSecret: 'tokensecret123',
          isActive: true,
          interests: 'This is the right interests string',
          interval: 7,
          dueNext: new Date(),
          userUserId: 4,
        },
        {
          platform: 'twitter',
          token: 'abc123',
          tokenSecret: 'tokensecret123',
          isActive: false,
          interests: 'This is the wrong interests string',
          interval: 7,
          dueNext: new Date(),
          userUserId: 5,
        },
      ];

      User.sync({ force: true })
        .then(() => User.bulkCreate(testUsers))
        .then(() => Setting.sync({ force: true }))
        .then(() => Setting.bulkCreate(testSettings))
        .then(() => { done(); });
    });

    it('res.send should be called with the userSettings array object of only that userId', (done) => {
      const req = {
        user: {
          userId: 4,
        },
      };

      const res = {};
      res.send = (userSettings) => {
        expect(updateSettings.length).to.equal(2);
        const isSettings = userSettings.every(setting => setting.dataValues.interests === 'This is the right interests string');
        expect(isSettings).to.equal(true);
        done();
      };

      getSettings(req, res);
    });
  });

  describe('updateSettings', () => {
    beforeEach((done) => {
      const testUsers = [
        {
          userId: 4,
          username: 'Matt',
          password: '123',
        },
      ];

      const testSettings = [
        {
          platform: 'facebook',
          token: 'abc123',
          tokenSecret: 'tokensecret123',
          isActive: true,
          interests: 'This is the right interests string',
          interval: 7,
          dueNext: new Date(),
          userUserId: 4,
        },
      ];

      User.sync({ force: true })
        .then(() => User.bulkCreate(testUsers))
        .then(() => Setting.sync({ force: true }))
        .then(() => Setting.bulkCreate(testSettings))
        .then(() => { done(); });
    });

    it('should call res.json with the update status if the setting object exists', (done) => {
      const req = {
        body: {
          settings: {
            interests: 'This is a new interests string',
            interval: 7,
            isActive: true,
          },
          platform: 'facebook',
        },
        user: {
          userId: 4,
        },
      };
      const res = {};
      res.json = (updateStatus) => {
        expect(updateStatus[0]).to.equal(1);
        done();
      };

      updateSettings(req, res);
    });

    it('should update the targetted settingObject in the db', (done) => {
      const req = {
        body: {
          settings: {
            interests: 'This is a new interests string',
            interval: 7,
            isActive: true,
          },
          platform: 'facebook',
        },
        user: {
          userId: 4,
        },
      };
      const res = {};
      res.json = () => {
        Setting.findOne({
          where: {
            userUserId: req.user.userId,
            platform: req.body.platform,
          },
        }).then(setting => {
          expect(setting.dataValues.interests).to.equal('This is a new interests string');
          done();
        });
      };

      updateSettings(req, res);
    });

    it('should call res.json with the newly created object if the setting object does not exist', (done) => {
      const req = {
        body: {
          settings: {
            interests: 'This is a new interests string',
            interval: 7,
            isActive: true,
          },
          platform: 'linkedin',
        },
        user: {
          userId: 4,
        },
      };

      const res = {};
      res.json = (createStatus) => {
        expect(createStatus.dataValues.platform).to.equal('linkedin');
        expect(createStatus.dataValues.interests).to.equal('This is a new interests string');
        done();
      };

      updateSettings(req, res);
    });

    it('should write the passed in settingObject to the db if the setting object does not exist', (done) => {
      const req = {
        body: {
          settings: {
            interests: 'This is a new interests string',
            interval: 7,
            isActive: true,
          },
          platform: 'linkedin',
        },
        user: {
          userId: 4,
        },
      };

      const res = {};
      res.json = () => {
        Setting.findOne({
          where: {
            userUserId: req.user.userId,
            platform: req.body.platform,
          },
        }).then(setting => {
          expect(setting.dataValues.platform).to.equal('linkedin');
          expect(setting.dataValues.interests).to.equal('This is a new interests string');
          done();
        });
      };

      updateSettings(req, res);
    });
  });

  describe('requestPlatformLogout', () => {
    beforeEach((done) => {
      const testUsers = [
        {
          userId: 4,
          username: 'Matt',
          password: '123',
        },
      ];

      const testSettings = [
        {
          platform: 'facebook',
          token: 'abc123',
          tokenSecret: 'tokensecret123',
          isActive: true,
          interests: 'This is the right interests string',
          interval: 7,
          dueNext: new Date(),
          userUserId: 4,
        },
      ];

      User.sync({ force: true })
        .then(() => User.bulkCreate(testUsers))
        .then(() => Setting.sync({ force: true }))
        .then(() => Setting.bulkCreate(testSettings))
        .then(() => { done(); });
    });

    it('should call res.json with { verdict: success }', (done) => {
      const req = {
        body: {
          platform: 'facebook',
        },
        user: {
          userId: 4,
        },
      };

      const res = {};
      res.json = (verdict) => {
        expect(verdict).to.deep.equal({ verdict: 'success' });
        done();
      };

      requestPlatformLogout(req, res);
    });

    it('should remove the token and tokenSecret from the db for the specified userId and platform', (done) => {
      const req = {
        body: {
          platform: 'facebook',
        },
        user: {
          userId: 4,
        },
      };

      const res = {};
      res.json = () => {
        Setting.findOne({
          where: {
            platform: req.body.platform,
            userUserId: req.user.userId,
          },
        }).then(setting => {
          expect(setting.dataValues.platform).to.equal('facebook');
          expect(setting.dataValues.token).to.equal('');
          expect(setting.dataValues.tokenSecret).to.equal('');
          done();
        });
      };

      requestPlatformLogout(req, res);
    });
  });
});