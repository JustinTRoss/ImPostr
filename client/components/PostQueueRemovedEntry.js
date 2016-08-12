import React from 'react';
import moment from 'moment';
import { ListGroupItem, Button } from 'react-bootstrap';


const PostQueueRemovedEntry = ({ post, onInsertItemClick, index }) => (
  <ListGroupItem>
    {`${post.message} will NOT be posted anymore on ${post.platform} at ${moment(post.time).fromNow()}`}
    <Button
      onClick={() => {
        onInsertItemClick(post.postId, index);
        console.log(post.postId);
      }}

      bsStyle="primary"
      size="small"
    >
      Add item
    </Button>
  </ListGroupItem>
);

export default PostQueueRemovedEntry;
