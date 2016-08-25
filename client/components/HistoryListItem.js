import React from 'react';
import moment from 'moment';

const HistoryListItem = ({ history }) => {
  let { message, platform, updatedAt } = history;
  return (
    <div>
      {`'${message}' was posted on ${platform} at ${moment(updatedAt).fromNow()}`}
    </div>
  );
};

export default HistoryListItem;
