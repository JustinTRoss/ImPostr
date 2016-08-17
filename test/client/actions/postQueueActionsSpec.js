import { expect } from 'chai';

import {
  removeItem,
  insertItem,
  REMOVE_ITEM_FROM_QUEUE,
  INSERT_ITEM_FROM_QUEUE,
} from '../../../client/actions/postQueueActions';

xdescribe('Post Queue Actions', () => {
  xdescribe('removeItem()', () => {
    it('should create an action to remove item', () => {
      const index = 1;
      const expectedAction = {
        type: REMOVE_ITEM_FROM_QUEUE,
        index,
      };
      expect(removeItem(index)).to.deep.equal(expectedAction);
    });
  });

  xdescribe('insertItem()', () => {
    it('should create an action to insert item', () => {
      const index = 1;
      const expectedAction = {
        type: INSERT_ITEM_FROM_QUEUE,
        index,
      };
      expect(insertItem(index)).to.deep.equal(expectedAction);
    });
  });
});
