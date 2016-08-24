import { expect } from 'chai';

import reducer from '../../../client/reducers/postQueue';

import { REMOVE_ITEM_FROM_QUEUE, INSERT_ITEM_FROM_QUEUE, INSERT_QUEUE } from '../../../client/actions/postQueueActions';

describe('Post Queue Reducer', () => {
  it('should return initial state', () => {
    const initialState = undefined;

    const action = {};

    const finalState = {
      queuedItems: [],
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
          isActive: true,
        },
      ],
      removedItems: [],
    };

    const action = {
      type: REMOVE_ITEM_FROM_QUEUE,
      index: 0,
    };

    const finalState = {
      queuedItems: [],
      removedItems: [
        {
          message: 'yo',
          time: 'time',
          platform: 'facebook',
          isActive: false,
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
          isActive: false,
        },
      ],
    };

    const action = {
      type: INSERT_ITEM_FROM_QUEUE,
      index: 0,
    };

    const finalState = {
      queuedItems: [
        {
          message: 'yo',
          time: 'time',
          platform: 'facebook',
          isActive: true,
        },
      ],
      removedItems: [],
    };

    expect(reducer(initialState, action)).to.deep.equal(finalState);
  });

  it('should handle INSERT_QUEUE', () => {
    const initialState = {
      queuedItems: [],
      removedItems: [],
    };

    const action = {
      type: INSERT_QUEUE,
      queue: [
        {
          message: 'hey',
          time: 'time',
          platform: 'facebook',
          isActive: true,
        },
        {
          message: 'yo',
          time: 'time',
          platform: 'linkedin',
          isActive: true,
        },
      ],
    };

    const finalState = {
      queuedItems: [
        {
          message: 'hey',
          time: 'time',
          platform: 'facebook',
          isActive: true,
        },
        {
          message: 'yo',
          time: 'time',
          platform: 'linkedin',
          isActive: true,
        },
      ],
      removedItems: [],
    };

    expect(reducer(initialState, action)).to.deep.equal(finalState);
  });
});
