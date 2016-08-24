import React from 'react';
import moment from 'moment';
import { Button } from 'react-bootstrap';

const PostQueueRemovedEntry = ({ post, requestRemove, index }) => (
  <div className="list-group-item">
    {`${post.message} will NOT be posted anymore on ${post.platform} at ${moment(post.expires).fromNow()}`}
    <Button
      onClick={() => { requestRemove(post, index); }}
      bsStyle="primary"
      size="small"
    >
      Add item
    </Button>
  </div>
);

export default PostQueueRemovedEntry;
