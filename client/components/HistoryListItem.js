import React from 'react';
import moment from 'moment';

const HistoryListItem = ({ history }) => {
  const { message, platform, expires } = history;
  return (
    <div className="PQEContainer">
      <div
        className="PQELogo"
        style={{ backgroundImage: `url(../style/${platform}icon.png)` }}
      >
      </div>
      <div className="PostQueueEntry">
        <div>
          {message}
        </div>
        <div className="PostQueueEntryRight">
          <div>
            {moment(expires).fromNow()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryListItem;
