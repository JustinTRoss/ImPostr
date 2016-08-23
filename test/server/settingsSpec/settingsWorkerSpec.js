process.env.NODE_ENV = 'test';

const { expect } = require('chai');

const User = require('../../../server/users/user.model');
const Setting = require('../../../server/settings/setting.model');
const { getActiveOverDueNext, updateDueNext } = require('../../../server/settings/setting.controller');

describe('setting.controller', () => {
  describe('postGenerator work functions', () => {
    beforeEach((done) => {
      const testUser = {
        userId: 4,
        username: 'Matt',
        password: '123',
      };

      const dateForYesterday = new Date();
      const dateForTomorrow = new Date();
      const MILLISECOND_TO_DAY = 86400000;
      const dueNextYesterday = new Date(dateForYesterday.setTime(dateForYesterday.getTime() - 1 * MILLISECOND_TO_DAY));
      const dueNextTommorrow = new Date(dateForTomorrow.setTime(dateForTomorrow.getTime() + 1 * MILLISECOND_TO_DAY));

      const testSettings = [
        {
          platform: 'facebook',
          token: 'abc123',
          tokenSecret: 'tokensecret123',
          isActive: true,
          interests: 'sharks, geology',
          interval: 7,
          dueNext: dueNextYesterday,
          userUserId: 4,
        },
        {
          platform: 'linkedin',
          token: 'abc123',
          tokenSecret: 'tokensecret123',
          isActive: true,
          interests: 'pizza, whales',
          interval: 7,
          dueNext: dueNextTommorrow,
          userUserId: 4,
        },
        {
          platform: 'twitter',
          token: 'abc123',
          tokenSecret: 'tokensecret123',
          isActive: false,
          interests: 'chocolate, horses',
          interval: 7,
          dueNext: dueNextYesterday,
          userUserId: 4,
        },
        {
          platform: 'facebook',
          token: 'abc123',
          tokenSecret: 'tokensecret123',
          isActive: false,
          interests: 'Africa, mantarays',
          interval: 7,
          dueNext: dueNextTommorrow,
          userUserId: 4,
        },
      ];

      User.sync({ force: true })
        .then(() => User.create(testUser))
        .then(() => Setting.sync({ force: true }))
        .then(() => Setting.bulkCreate(testSettings))
        .then(() => { done(); });
    });

    describe('getActiveOverDueNext()', () => {
      it('should resond with a list of users who are both active and ready to post on that platform', (done) => {
        Setting.findAll()
          .then(settings => { expect(settings.length).to.equal(4); })
          .then(() => getActiveOverDueNext())
          .then(overDueSettings => {
            expect(overDueSettings.length).to.equal(1);
            expect(overDueSettings[0].dataValues.interests).to.equal('sharks, geology');
            done();
          });
      });
    });

    describe('updateDueNext()', () => {
      it('should update the value of dueNext', (done) => {
        Setting.findAll()
          .then(settings => { expect(settings.length).to.equal(4); })
          .then(() => getActiveOverDueNext())
          .then(overDueSettings => {
            expect(overDueSettings.length).to.equal(1);
            const { settingId, interval } = overDueSettings[0].dataValues;
            const daysTillNext = 7 / interval;
            const currentDate = new Date();
            const MILLISECOND_TO_DAY = 86400000;
            const dueNext = new Date(currentDate.setTime(currentDate.getTime() + daysTillNext * MILLISECOND_TO_DAY));

            updateDueNext(settingId, dueNext)
              .then(status => {
                expect(status[0]).to.equal(1);
                done();
              });
          });
      });
    });
  });
});
