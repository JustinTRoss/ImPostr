import React from 'react';
import moment from 'moment';
import { ListGroupItem, Button } from 'react-bootstrap';

const PostQueueRemovedEntry = ({ post, requestRemove, index }) => (
  <ListGroupItem>
    {`${post.message} will NOT be posted anymore on ${post.platform} at ${moment(post.expires).fromNow()}`}
    <Button
      onClick={() => { requestRemove(post, index); }}
      bsStyle="primary"
      size="small"
    >
      Add item
    </Button>
  </ListGroupItem>
);

export default PostQueueRemovedEntry;
