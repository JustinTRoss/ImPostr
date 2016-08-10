import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  requestStart,
  receiveFailure,
  updateFormValue,
  changeFormType,
  receiveLogin,
  receiveSignup,
  receiveLogout,
  sendLoginToServer,
  sendSignupToServer,
  requestLogout,
  REQUEST_START,
  RECEIVE_USER_LOGIN,
  RECEIVE_FAILURE,
  RECEIVE_USER_LOGOUT,
  RECEIVE_USER_SIGNUP,
  UPDATE_FORM_VALUE,
  CHANGE_FORM_TYPE,
} from '../../../client/actions/UserLoginActions';

describe('User Login Actions Spec', () => {
  describe('sync actions', () => {
    describe('requestStart()', () => {
      it('should create an action to requestStart', () => {
        const expectedAction = {
          type: REQUEST_START,
        };
        expect(requestStart()).to.deep.equal(expectedAction);
      });
    });

    describe('receiveFailure()', () => {
      it('should create an action to receiveFailure', () => {
        const username = 'tom';
        const formName = 'signup';
        const expectedAction = {
          type: RECEIVE_FAILURE,
          username,
          formName,
        };
        expect(receiveFailure({ username, formName })).to.deep.equal(expectedAction);      
      });
    });

    describe('updateFormValue()', () => {
      it('should create an action to updateFormValue', () => {
        const formData = 'tom';
        const expectedAction = {
          type: UPDATE_FORM_VALUE,
          formData,
        };
        expect(updateFormValue(formData)).to.deep.equal(expectedAction);      
      });
    });

    describe('changeFormType()', () => {
      it('should create an action to changeFormType', () => {
        const formType = 'signup';
        const expectedAction = {
          type: CHANGE_FORM_TYPE,
          formType,
        };
        expect(changeFormType(formType)).to.deep.equal(expectedAction);      
      });
    });

    describe('receiveLogin()', () => {
      it('should create an action to receiveLogin', () => {
        const user = { userId: '123' };
        const { userId } = user;
        const expectedAction = {
          type: RECEIVE_USER_LOGIN,
          userId,
        };
        expect(receiveLogin(user)).to.deep.equal(expectedAction);      
      });
    });

    describe('receiveSignup()', () => {
      it('should create an action to receiveSignup', () => {
        const user = { userId: '123' };
        const { userId } = user;
        const expectedAction = {
          type: RECEIVE_USER_SIGNUP,
          userId,
        };
        expect(receiveSignup(user)).to.deep.equal(expectedAction);      
      });
    });

    describe('receiveLogout()', () => {
      it('should create an action to receiveLogout', () => {
        const expectedAction = {
          type: RECEIVE_USER_LOGOUT,
        };
        expect(receiveLogout()).to.deep.equal(expectedAction);      
      });
    });
  });

  describe('async actions', () => {
    describe('sendLoginToServer()', () => {
    });

    describe('sendSignupToServer()', () => {
    });

    describe('requestLogout()', () => {
    });
  });
});
