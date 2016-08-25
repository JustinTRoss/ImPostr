import React from 'react';
import HistoryListItem from './HistoryListItem';

const HistoryList = ({ history }) => {
  history = history || [];
  return (
    <div>
      {history.map(historyItem => (
        <HistoryListItem
          history={historyItem}
          key={historyItem.postId}
        />
      ))}
    </div>
  );
};

export default HistoryList;
