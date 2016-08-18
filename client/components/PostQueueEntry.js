import React from 'react';
import moment from 'moment';
import { ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';

const PostQueueEntry = ({ post, onRemoveItemClick, index }) => (
  <ListItem style={{backgroundColor: 'white', border: '1px'}}>
    {`${post.message} will be posted on ${post.platform} at ${moment(post.time).fromNow()}`}
    <FlatButton
      label="Remove"
      primary={true}
      onClick={() => { onRemoveItemClick(post.postId, index); }}
     />
  </ListItem>
);

export default PostQueueEntry;
