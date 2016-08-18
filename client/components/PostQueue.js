import React from 'react';
import { List } from 'material-ui/List';
import { Tabs, Tab } from 'material-ui/Tabs';
import PostQueueEntry from './PostQueueEntry';
import PostQueueRemovedEntry from './PostQueueRemovedEntry';

const PostQueue = ({
  postId,
  queuedItems,
  removedItems,
  requestRemove,
}) => (
  <Tabs style={{ display: 'block' }}>
    <Tab label="Pending Posts">
      <List>
        {queuedItems.map((post, index) => (
          <PostQueueEntry
            index={index}
            requestRemove={requestRemove}
            post={post}
          />
        ))}
      </List>
    </Tab>
    <Tab label="Cancelled Posts" >
      <List>
        {removedItems.map((post, index) => (
          <PostQueueRemovedEntry
            index={index}
            requestRemove={requestRemove}
            post={post}
          />
        ))}
      </List>
    </Tab>
  </Tabs>
);

export default PostQueue;
