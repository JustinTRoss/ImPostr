import React from 'react';

const HistoryListItem = ({ history }) => {
  let { message, platform, updatedAt } = history;
  return (
    <div>
      {`'${message}' was posted on ${platform} at ${updatedAt}`}
    </div>
  );
};

export default HistoryListItem;
