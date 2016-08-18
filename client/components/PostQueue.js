import React from 'react';
import { Panel, ListGroup } from 'react-bootstrap';
import { List } from 'material-ui/List';
import {Tabs, Tab} from 'material-ui/Tabs';
import PostQueueEntry from './PostQueueEntry';
import PostQueueRemovedEntry from './PostQueueRemovedEntry';

const PostQueue = ({
  postId,
  queuedItems,
  removedItems,
  onRemoveItemClick,
  onInsertItemClick,
}) => (
    <Tabs style={{display: 'block',}}>
      <Tab label="Pending Posts">
        <List>
          {queuedItems.map((post, index) => (
            <PostQueueEntry
              index={index}
              onRemoveItemClick={onRemoveItemClick}
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
              onInsertItemClick={onInsertItemClick}
              post={post}
            />
          ))}
        </List>
      </Tab>
    </Tabs>
);

export default PostQueue;
