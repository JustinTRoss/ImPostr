import React from 'react';
import moment from 'moment';
import FlatButton from 'material-ui/FlatButton';

const PostQueueEntry = ({ post, requestRemove, index }) => (
  <div className="list-group-item">
    {`${post.message} will be posted on ${post.platform} at ${moment(post.expires).fromNow()}`}
    <FlatButton
      label="Remove"
      primary={true}
      onClick={() => { requestRemove(post, index); }}
    />
  </div>
);

export default PostQueueEntry;
