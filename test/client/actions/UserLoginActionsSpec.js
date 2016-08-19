import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import localStorage from 'mock-local-storage';
// import jsdom from 'jsdom';
// const window = jsdom.jsdom().parentWindow;
// console.log('window', window);
// import cookies from 'cookies-js';
// const Cookies = cookies(window);


import {
  requestStart,
  receiveFailure,
  receiveJWTSuccess,
  receiveJWTFailure,
  checkJWTWithServer,
  throwFieldValidationError,
  updateFormValue,
  changeFormType,
  receiveLogin,
  sendLoginToServer,
  receiveSignup,
  sendSignupToServer,
  receiveLogout,
  requestLogout,
  REQUEST_START,
  RECEIVE_USER_LOGIN,
  RECEIVE_FAILURE,
  RECEIVE_USER_LOGOUT,
  RECEIVE_USER_SIGNUP,
  UPDATE_FORM_VALUE,
  CHANGE_FORM_TYPE,
  RECEIVE_JWT_FAILURE,
  RECEIVE_JWT_SUCCESS,
  THROW_FIELD_VALIDATION_ERROR,
} from '../../../client/actions/UserLoginActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

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

    describe('receiveJWTSuccess()', () => {
      it('should create an action to receiveJWTSuccess', () => {
        const json = {
          token: 'abc',
        };
        const { token } = json;
        const expectedAction = {
          type: RECEIVE_JWT_SUCCESS,
          token,
        };
        expect(receiveJWTSuccess(json)).to.deep.equal(expectedAction);
      });
    });

    describe('receiveJWTFailure()', () => {
      it('should create an action to receiveJWTFailure', () => {
        const expectedAction = {
          type: RECEIVE_JWT_FAILURE,
        };
        expect(receiveJWTFailure()).to.deep.equal(expectedAction);
      });
    });

    describe('throwFieldValidationError()', () => {
      it('should create an action to throwFieldValidationError', () => {
        const fieldName = 'text';
        const formName = 'signup';
        const expectedAction = {
          type: THROW_FIELD_VALIDATION_ERROR,
          fieldName,
          formName,
        };
        expect(throwFieldValidationError(fieldName, formName)).to.deep.equal(expectedAction);
      });
    });

    describe('updateFormValue()', () => {
      it('should create an action to updateFormValue', () => {
        const formData = 'tom';
        const formName = 'signup';
        const expectedAction = {
          type: UPDATE_FORM_VALUE,
          formData,
          formName,
        };
        expect(updateFormValue(formData, formName)).to.deep.equal(expectedAction);
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
        const json = {
          userId: '123',
          token: 'abc',
        };
        const { userId, token } = json;
        const expectedAction = {
          type: RECEIVE_USER_LOGIN,
          userId,
          token,
        };
        expect(receiveLogin(json)).to.deep.equal(expectedAction);
      });
    });

    describe('receiveSignup()', () => {
      it('should create an action to receiveSignup', () => {
        const json = {
          userId: '123',
          token: 'abc',
        };
        const { userId, token } = json;
        const expectedAction = {
          type: RECEIVE_USER_SIGNUP,
          userId,
          token,
        };
        expect(receiveSignup(json)).to.deep.equal(expectedAction);
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
    // afterEach(() => {
    //         localStorage.clear();
    //     // remove callback
    //         localStorage.itemInsertionCallback = null;
    //     });
    // const sandbox;

    // beforeEach(() => {
    //   sandbox = sinon.sandbox.create()
    //   window.localStorage.token = 'abc';
    // })

    // afterEach(function() {
    //   sandbox.restore()
    // })

    describe('checkJWTWithServer()', () => {
      it('has issues because has to access local storage');
    });

    describe('sendLoginToServer()', () => {
      it('should generate a REQUEST_START, UPDATE_FORM_VALUE, and RECEIVE_USER_LOGIN, if successful server response', () => {

        const formData = {
          username: 'tom',
          password: '123',
        };
        const formName = 'login';
        const jsonRes = {
          userId: 12,
          token: 'abc',
        };
        const { userId, token } = jsonRes;
        const expectedActions = [
          {
            type: REQUEST_START,
          },
          {
            type: UPDATE_FORM_VALUE,
            formData,
            formName,
          },
          {
            type: RECEIVE_USER_LOGIN,
            userId,
            token,
          },
        ];
        const { username, password } = formData;
        nock('http://127.0.0.1:3000', {
          username,
          password,
        })
          .post('/user/login')
          .reply(200, jsonRes);

        const store = mockStore({});

        return store.dispatch(sendLoginToServer(formData))
          .then(() => {
            console.log('store.getActions()', store.getActions());
            expect(store.getActions()).to.deep.equal(expectedActions);
          });
      });
    });

    describe('sendSignupToServer()', () => {
    });

    describe('requestLogout()', () => {
    });
  });
});
