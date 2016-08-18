import React from 'react';
import moment from 'moment';
import { ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';

const PostQueueEntry = ({ post, requestRemove, index }) => (
  <ListItem>
    {`${post.message} will be posted on ${post.platform} at ${moment(post.expires).fromNow()}`}
    <FlatButton
      label="Remove item"
      onClick={() => { requestRemove(post, index); }}
    />
  </ListItem>
);

export default PostQueueEntry;
