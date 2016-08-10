import { expect } from 'chai';

import reducer from '../../../client/reducers/postQueue';

import { REMOVE_ITEM_FROM_QUEUE, INSERT_ITEM_FROM_QUEUE } from '../../../client/actions/postQueueActions';

describe('Post Queue Reducer', () => {
  it('should return initial state', () => {
    const initialState = undefined;

    const action = {};

    const finalState = {
      queuedItems: [
        {
          message: 'yo',
          time: 'tomorrow',
          platform: 'facebook',
        },
        {
          message: 'hey',
          time: 'tomorrow',
          platform: 'twitter',
        },
      ],
      removedItems: [],
    };

    expect(reducer(initialState, action)).to.deep.equal(finalState);
  });

  it('should handle REMOVE_ITEM_FROM_QUEUE', () => {
    const initialState = {
      queuedItems: [
        {
          message: 'yo',
          time: 'time',
          platform: 'facebook',
        },
      ],
      removedItems: [],
    };

    const index = 0;
    const action = {
      type: REMOVE_ITEM_FROM_QUEUE,
      index,
    };

    const finalState = {
      queuedItems: [],
      removedItems: [
        {
          message: 'yo',
          time: 'time',
          platform: 'facebook',
        },
      ],
    };

    expect(reducer(initialState, action)).to.deep.equal(finalState);
  });

  it('should handle INSERT_ITEM_FROM_QUEUE', () => {
    const initialState = {
      queuedItems: [],
      removedItems: [
        {
          message: 'yo',
          time: 'time',
          platform: 'facebook',
        },
      ],
    };

    const index = 0;
    const action = {
      type: INSERT_ITEM_FROM_QUEUE,
      index,
    };

    const finalState = {
      queuedItems: [
        {
          message: 'yo',
          time: 'time',
          platform: 'facebook',
        },
      ],
      removedItems: [],
    };

    expect(reducer(initialState, action)).to.deep.equal(finalState);
  });
});
