import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';


import {
  handleFieldChange,
  resetForm,
  validateForm,
  handleFormSubmit,
  FIELD_CHANGE,
  RESET_FORM,
  VALIDATE_FORM,
} from '../../../client/actions/addNewPostActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('addNewPostActions', () => {
  describe('sync actions', () => {
    describe('handleFieldChange()', () => {
      it('should create a FIELD_CHANGE action', () => {
        const field = 'message';
        const data = 'ponies, wall street';
        const expectedAction = {
          type: FIELD_CHANGE,
          field,
          data,
        };
        expect(handleFieldChange(field, data)).to.deep.equal(expectedAction);
      });
    });

    describe('resetForm()', () => {
      it('should create a RESET_FORM action', () => {
        const expectedAction = {
          type: RESET_FORM,
        };
        expect(resetForm()).to.deep.equal(expectedAction);
      });
    });

    describe('validateForm()', () => {
      it('should create a VALIDATE_FORM action', () => {
        const fields = {
          message: 'hey bob',
          time: 'tomorrow',
        };
        const expectedAction = {
          type: VALIDATE_FORM,
          fields,
        };
        expect(validateForm(fields)).to.deep.equal(expectedAction);
      });
    });
  });

  //issues >> makes multiple http calls: handle form submit, request queue
  describe('async actions', () => {
    xdescribe('handleFormSubmit()', () => {
      afterEach(() => {
        nock.cleanAll();
      });

      it('should create generate a call to the requestQueue function', () => {
        const token = 'abc';
        const store = mockStore({ userLogin: { token: 'abc' } });
        const post = {
          message: 'lets go',
          time: 'tomorrow',
        };

        const queue = [
          {
            message: 'message numero dos',
            time: 'next week',
          },
          {
            message: 'lets go',
            time: 'tomorrow',
          },
        ];

        const expectedAction = {
          type: 'INSERT_QUEUE',
          queue,
        };

        nock('http://127.0.0.1:3000')
          .post('/post/addNewFromUser', {
            post,
          })
          .reply(200, { body: { status: 'confirmation of successful post' } });

        return store.dispatch(handleFormSubmit(post))
          .then(() => {
            expect(store.getActions()[0]).to.deep.equal(expectedAction);
          });
      });
    });
  });
});