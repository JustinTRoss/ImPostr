import React from 'react';

import PostQueueEntry from './PostQueueEntry';

const PostQueue = ({ posts }) => {
	return (
    <div>
  		<div>
        {posts.queuedItems.map(post => <PostQueueEntry post={post} />)}
  		</div>
      <div>
        {posts.removedItems.map(post => <PostQueueEntry post={post} />)}
      </div>
    </div>
	);
}

export default PostQueue;