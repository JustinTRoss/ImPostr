import React from 'react';
import moment from 'moment';

const PostQueueRemovedEntry = ({ post, requestRemove, index }) => (
  <div className="PQEContainer">
    <div
      className="PQELogo"
      style={{"backgroundImage": `url(../style/${post.platform}icon.png)` } }
    >
    </div>
    <div className="PostQueueEntry">
      <div>
        {post.message}
      </div>
      <div className="PostQueueEntryRight">
        <div>
          {moment(post.expires).fromNow()}
        </div>
        <button
          type="button"
          className="btn btn-link PQERemoveButton"
          onClick={() => { requestRemove(post, index); }}
        >Add Back</button>
      </div>
    </div>
  </div>
);

export default PostQueueRemovedEntry;
