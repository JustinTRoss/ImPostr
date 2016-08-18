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
  requestRemove,
}) => (
<<<<<<< b7b5a37a6cbe1cb7e7cb2fd8568cc740625e8668
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
=======
  <Panel header="All posts">
    <ListGroup>
      Pending posts
      {queuedItems.map((post, index) => (
        <PostQueueEntry
          index={index}
          requestRemove={requestRemove}
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
          requestRemove={requestRemove}
          post={post}
        />
      )
      )}
    </ListGroup>
  </Panel>
>>>>>>> fixed bug in adding to and removing from post queue
);

export default PostQueue;
