import React from 'react';

import PostQueueEntry from './PostQueueEntry';
import PostQueueRemovedEntry from './PostQueueRemovedEntry';

const PostQueue = ({
  queuedItems,
  removedItems,
  onInsertItemClick,
  onRemoveItemClick,
}) => (
  <div>
    <div>
      {queuedItems.map(post => (
        <PostQueueEntry
          onInsertItemClick={onInsertItemClick}
          post={post}
        />
      )
      )}
    </div>
    <div>
      {removedItems.map(post => (
        <PostQueueRemovedEntry
          onRemoveItemClick={onRemoveItemClick}
          post={post}
        />
      )
      )}
    </div>
  </div>
);

export default PostQueue;
