import React from 'react';
import moment from 'moment';
import { ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';

const PostQueueEntry = ({ post, requestRemove, index }) => (
  <ListGroupItem>
    {`${post.message} will be posted on ${post.platform} at ${moment(post.expires).fromNow()}`}
    <Button
      onClick={() => { requestRemove(post, index); }}
      bsStyle="warning"
      size="small"
    >
      Remove item
    </Button>
  </ListGroupItem>
);

export default PostQueueEntry;
