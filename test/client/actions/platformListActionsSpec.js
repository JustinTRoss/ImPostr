import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  receivePlatformLogin,
  requestPlatformLogin,
  logoutPlatform,
  toggleModal,
  receiveSettingsFields,
  setSettingsFields,
  LOGIN_PLATFORM,
  LOGOUT_PLATFORM,
  TOGGLE_MODAL,
  RECEIVE_SETTINGS_FIELDS,
} from '../../../client/actions/platformListActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Platform List Actions', () => {
  describe('async action', () => {
    describe('requestPlatformLogin()', () => {
      afterEach(() => {
        nock.cleanAll();
      });

      it('should create LOGIN_PLATFORM action when fetching todos has been done', () => {
        const platform = 'facebook';
        const store = mockStore({});
        const expectedAction = {
          type: LOGIN_PLATFORM,
          platform,
        };

        nock('http://127.0.0.1:3000')
          .post('/platform/platformlogin', {
            platform,
          })
          .reply(200, { body: { status: 'FB logged in' } });

        store.dispatch(requestPlatformLogin(platform))
          .then(() => {
            expect(store.getActions()[0]).to.deep.equal(expectedAction);
          });

        expect(receivePlatformLogin(platform)).to.deep.equal(expectedAction);
      });
    });

    describe('setSettingsFields()', () => {
      afterEach(() => {
        nock.cleanAll();
      });

      it('should create RECEIVE_SETTINGS_FIELDS action when fetching todos has been done', () => {
        const platform = 'facebook';
        const settings = {
          autoPilot: false,
          interests: [],
          postFrequency: 0,
        };
        const store = mockStore({});
        const expectedAction = {
          type: RECEIVE_SETTINGS_FIELDS,
          platform,
          settings,
        };

        nock('http://127.0.0.1:3000')
          .post('/platform/updatesettings', {
            platform,
            settings,
          })
          .reply(200, { body: { status: 'FB settings updated' } });

        store.dispatch(setSettingsFields(platform, settings))
          .then(() => {
            expect(store.getActions()[0]).to.deep.equal(expectedAction);
          });

        expect(receiveSettingsFields(platform, settings)).to.deep.equal(expectedAction);
      });
    });
  });

  describe('sync actions', () => {
    describe('receivePlatformLogin()', () => {
      it('should create an action to login to the specified platform', () => {
        const platform = 'facebook';
        const expectedAction = {
          type: LOGIN_PLATFORM,
          platform,
        };
        expect(receivePlatformLogin(platform)).to.deep.equal(expectedAction);
      });
    });

    describe('logoutPlatform()', () => {
      it('should create an action to logout to the specified platform', () => {
        const platform = 'facebook';
        const expectedAction = {
          type: LOGOUT_PLATFORM,
          platform,
        };
        expect(logoutPlatform(platform)).to.deep.equal(expectedAction);
      });
    });

    describe('toggleModal()', () => {
      it('should create an action to toggle modal on the specified platform', () => {
        const platform = 'facebook';
        const expectedAction = {
          type: TOGGLE_MODAL,
          platform,
        };
        expect(toggleModal(platform)).to.deep.equal(expectedAction);
      });
    });

    describe('receiveSettingsFields()', () => {
      it('should create an action to toggle modal on the specified platform', () => {
        const platform = 'facebook';
        const settings = {
          autoPilot: false,
          interests: [],
          postFrequency: 0,
        };
        const expectedAction = {
          type: RECEIVE_SETTINGS_FIELDS,
          platform,
          settings,
        };
        expect(receiveSettingsFields(platform, settings)).to.deep.equal(expectedAction);
      });
    });
  });
});
