import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  removeItem,
  insertItem,
  insertQueue,
  requestQueue,
  requestRemove,
  REMOVE_ITEM_FROM_QUEUE,
  INSERT_ITEM_FROM_QUEUE,
  INSERT_QUEUE,
} from '../../../client/actions/postQueueActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Post Queue Actions', () => {
  describe('sync actions', () => {
    describe('removeItem()', () => {
      it('should create an action to remove item', () => {
        const index = 1;
        const expectedAction = {
          type: REMOVE_ITEM_FROM_QUEUE,
          index,
        };
        expect(removeItem(index)).to.deep.equal(expectedAction);
      });
    });

    describe('insertItem()', () => {
      it('should create an action to insert item', () => {
        const index = 1;
        const expectedAction = {
          type: INSERT_ITEM_FROM_QUEUE,
          index,
        };
        expect(insertItem(index)).to.deep.equal(expectedAction);
      });
    });

    describe('insertQueue()', () => {
      it('should create an action to insert queue', () => {
        const json = {
          queue: [
            {
              message: 'number 1',
              time: 'tomorrow',
            },
            {
              message: 'number 2',
              time: 'next week',
            },
          ],
        };
        const expectedAction = {
          type: INSERT_QUEUE,
          queue: json.queue,
        };

        expect(insertQueue(json)).to.deep.equal(expectedAction);
      });
    });
  });

  describe('async actions', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    describe('requestQueue()', () => {
      it('should create an action to INSERT_QUEUE', () => {
        const token = 'abc';
        const json = {
          queue: [
            {
              message: 'number 1',
              time: 'tomorrow',
            },
            {
              message: 'number 2',
              time: 'next week',
            },
          ],
        };

        nock('http://localhost:3000')
          .get('/post/getUser')
          .reply(200, json);

        const expectedAction = [
          {
            type: INSERT_QUEUE,
            queue: json.queue,
          },
        ];

        const store = mockStore({ userLogin: { token } });

        return store.dispatch(requestQueue(token))
          .then(() => {
            expect(store.getActions()).to.deep.equal(expectedAction);
          });
      });
    });

    describe('requestRemove()', () => {
      afterEach(() => {
        nock.cleanAll();
      });

      it('if currently active should create an action to REMOVE_ITEM_FROM_QUEUE', () => {
        const token = 'abc';
        const store = mockStore({ userLogin: { token } });
        const post = {
          postId: 5,
          isActive: true,
          index: 0,
        };

        const { index } = post;
        const expectedActions = [
          {
            type: REMOVE_ITEM_FROM_QUEUE,
            index,
          },
        ];

        const { postId, isActive } = post;
        nock('http://localhost:3000', {
          postId,
          isActive,
        })
          .post('/post/toggleIsActive')
          .reply(200, { status: true });

        return store.dispatch(requestRemove(post, index))
          .then(() => {
            expect(store.getActions()).to.deep.equal(expectedActions);
          });
      });

      it('if currently active should create an action to REMOVE_ITEM_FROM_QUEUE', () => {
        const token = 'abc';
        const store = mockStore({ userLogin: { token } });
        const post = {
          postId: 5,
          isActive: false,
          index: 0,
        };

        const { index } = post;
        const expectedActions = [
          {
            type: INSERT_ITEM_FROM_QUEUE,
            index,
          },
        ];

        const { postId, isActive } = post;
        nock('http://localhost:3000', {
          postId,
          isActive,
        })
          .post('/post/toggleIsActive')
          .reply(200, { status: true });

        return store.dispatch(requestRemove(post, index))
          .then(() => {
            expect(store.getActions()).to.deep.equal(expectedActions);
          });
      });
    });
  });
});
