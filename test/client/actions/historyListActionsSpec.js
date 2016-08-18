import { expect } from 'chai';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

import {
  receiveHistory,
  requestHistory,
  RECEIVE_USER_HISTORY,
} from '../../../client/actions/historyListActions';

describe('historyListActions', () => {
  describe('sync actions', () => {
    describe('receiveHistory()', () => {
      it('should emit a RECEIVE_USER_HISTORY action', () => {
        const json = {
          history: [
            {
              message: 'message 1',
              time: 'time1',
            },
            {
              message: 'message 2',
              time: 'time2',
            },
          ],
        };
        const { history } = json;
        const expectedAction = {
          type: RECEIVE_USER_HISTORY,
          history,
        };
        expect(receiveHistory(json)).to.deep.equal(expectedAction);
      });
    });
  });

  describe('async actions', () => {
    describe('requestHistory', () => {
      afterEach(() => {
        nock.cleanAll();
      });

      it('creates RECEIVE_USER_HISTORY when fetching history has been done', () => {
        const token = 'abc';
        const json = {
          history: [
            {
              message: 'message 1',
              time: 'time1',
            },
            {
              message: 'message 2',
              time: 'time2',
            },
          ],
        };
        
        nock('http://localhost:3000/')
          .get('/post/getPostHistory')
          .reply(200, json);


        const { history } = json;
        const expectedAction = [
          {
            type: RECEIVE_USER_HISTORY,
            history,
          },
        ];

        const store = mockStore({ history: [] });

        return store.dispatch(requestHistory(token))
         .then(() => {
           expect(store.getActions()).to.deep.equal(expectedAction);
         });
      });
    });
  });
});
