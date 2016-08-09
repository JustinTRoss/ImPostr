import React from 'react';
import { Panel, ListGroup } from 'react-bootstrap';


import PostQueueEntry from './PostQueueEntry';
import PostQueueRemovedEntry from './PostQueueRemovedEntry';

const PostQueue = ({
  queuedItems,
  removedItems,
  onRemoveItemClick,
  onInsertItemClick,
}) => (
  <Panel header="All posts">
    <ListGroup>
      Pending posts
      {queuedItems.map((post, index) => (
        <PostQueueEntry
          index={index}
          onRemoveItemClick={onRemoveItemClick}
          post={post}
        />
      )
      )}
    </ListGroup>
    <ListGroup>
      Cancelled posts
      {removedItems.map((post, index) => (
        <PostQueueRemovedEntry
          index={index}
          onInsertItemClick={onInsertItemClick}
          post={post}
        />
      )
      )}
    </ListGroup>
  </Panel>
);

export default PostQueue;
