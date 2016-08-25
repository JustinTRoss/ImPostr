import React from 'react';
import { List } from 'material-ui/List';
import { Tabs, Tab } from 'material-ui/Tabs';
import PostQueueEntry from './PostQueueEntry';
import PostQueueRemovedEntry from './PostQueueRemovedEntry';

const PostQueue = ({
  postId,
  queuedItems,
  removedItems,
  requestRemove,
}) => (
  <div className="container-fluid p-x-0">
    <ul className="nav nav-tabs b-0 row" role="tablist">
      <li className="nav-item col-xs">
        <a
          className="nav-link active b-0 inner-nav-link centerAll"
          data-toggle="tab"
          href="#pendingPosts"
          role="tab"
        ><span>Pending Posts</span></a>
      </li>
      <li className="nav-item col-xs">
        <a
          className="nav-link b-0 inner-nav-link centerAll"
          data-toggle="tab"
          href="#cancelledPosts"
          role="tab"
        ><span>Cancelled Posts</span></a>
      </li>
    </ul>

    <div className="tab-content">
      <div className="tab-pane active" id="pendingPosts" role="tabpanel">
        <div className="list-group">
          {queuedItems.map((post, index) => (
            <PostQueueEntry
              key={post.postId}
              index={index}
              requestRemove={requestRemove}
              post={post}
            />
          ))}
        </div>
      </div>
      <div className="tab-pane" id="cancelledPosts" role="tabpanel">
        <div className="">
          {removedItems.map((post, index) => (
            <PostQueueRemovedEntry
              key={post.postId}
              index={index}
              requestRemove={requestRemove}
              post={post}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default PostQueue;
