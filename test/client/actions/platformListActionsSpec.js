import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  validateForm,
  handleFieldChange,
  receivePlatformLogin,
  receivePlatformLogout,
  toggleModal,
  receiveSettingsFields,
  requestPlatformLogout,
  setSettingsFields,
  getSettingsFields,
  VALIDATE_FORM,
  FIELD_CHANGE,
  LOGIN_PLATFORM,
  LOGOUT_PLATFORM,
  TOGGLE_MODAL,
  RECEIVE_SETTINGS_FIELDS,

} from '../../../client/actions/platformListActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Platform List Actions', () => {
  describe('sync actions', () => {

    describe('validateForm()', () => {
      it('should create an action to validate a particular platform settings form', () => {
        const platform = 'facebook';
        const fields = 'fields';
        const expectedAction = {
          type: VALIDATE_FORM,
          platform,
          fields,
        };
        expect(validateForm(platform, fields)).to.deep.equal(expectedAction);
      });
    });

    describe('handleFieldChange()', () => {
      it('should create an action to validate a particular platform settings form', () => {
        const platform = 'facebook';
        const field = 'interests';
        const data = 'long walks on the beach';
        const expectedAction = {
          type: FIELD_CHANGE,
          platform,
          field,
          data,
        };
        expect(handleFieldChange(platform, field, data)).to.deep.equal(expectedAction);
      });
    });

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

    describe('receivePlatformLogout()', () => {
      it('should create an action to logout to the specified platform', () => {
        const platform = 'facebook';
        const expectedAction = {
          type: LOGOUT_PLATFORM,
          platform,
        };
        expect(receivePlatformLogout(platform)).to.deep.equal(expectedAction);
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
      it('should create an action to receive settings on the specified platform', () => {
        const platform = 'facebook';
        const settings = {
          autoPilot: false,
          interests: [],
          postFrequency: 0,
        };
        const settingId = 21;
        const expectedAction = {
          type: RECEIVE_SETTINGS_FIELDS,
          platform,
          settings,
          settingId,
        };
        expect(receiveSettingsFields(platform, settings, settingId)).to.deep.equal(expectedAction);
      });
    });
  });

  describe('async action', () => {
    describe('requestPlatformLogout()', () => {
      afterEach(() => {
        nock.cleanAll();
      });

      it('should create LOGOUT_PLATFORM action when fetching todos has been done', () => {
        const store = mockStore({ userLogin: { jwt: 'abc' } });
        const platform = 'facebook';
        const expectedAction = {
          type: LOGOUT_PLATFORM,
          platform,
        };

        nock('http://127.0.0.1:3000')
          .post('/settings/requestPlatformLogout', {
            platform,
          })
          .reply(200, { body: { status: 'FB settings updated' } });

        store.dispatch(requestPlatformLogout(platform))
          .then(() => {
            expect(store.getActions()[0].to.deep.equal(expectedAction));
          });

        expect(receivePlatformLogout(platform)).to.deep.equal(expectedAction);
      });
    });

    describe('setSettingsFields()', () => {
      afterEach(() => {
        nock.cleanAll();
      });

      it('should create RECEIVE_SETTINGS_FIELDS action when fetching todos has been done', () => {
        const store = mockStore({ userLogin: { jwt: 'abc' } });
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

    describe('getSettingsFields()');
  });
});
