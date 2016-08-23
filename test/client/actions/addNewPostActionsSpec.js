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

  //issues >> makes multiple http calls: handle form submit, request queue, store isnt being updated, fix reliance on functions
  describe('async actions', () => {
    describe('handleFormSubmit()', () => {
      it('has issues because has to access local storage');
    });
  });
});
