import React from 'react';

const PostQueueEntry = ({ post }) => {
	return (
		<div>PostQueueEntry
      {`${post.message} will be posted on ${post.platform} at ${post.time}`}
		</div>
	);
}

export default PostQueueEntry;