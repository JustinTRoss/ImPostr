import React from 'react';

const PostQueueRemovedEntry = ({ post, onRemoveItemClick }) => (
  <div>PostQueueRemovedEntry
    {`${post.message} will be posted on ${post.platform} at ${post.time}`}
  </div>
);

export default PostQueueRemovedEntry;
