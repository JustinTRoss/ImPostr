import React from 'react';
import moment from 'moment';
import { ListGroupItem, Button } from 'react-bootstrap';

const PostQueueEntry = ({ post, onRemoveItemClick, index }) => (
  <ListGroupItem>
    {`${post.message} will be posted on ${post.platform} at ${moment(post.time).fromNow()}`}
    <Button
      onClick={() => {
        onRemoveItemClick(post.postId, index);
        console.log(post.postId);
       }}
      bsStyle="warning"
      size="small"
    >
      Remove item
    </Button>
  </ListGroupItem>
);

export default PostQueueEntry;
