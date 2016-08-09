import React from 'react';

const PostQueueEntry = ({ post, onInsertItemClick }) => (
  <div>PostQueueEntry
    {`${post.message} will be posted on ${post.platform} at ${post.time}`}
  </div>
);

export default PostQueueEntry;
