import React, { Component } from 'react';
import HistoryListItem from './HistoryListItem';

const HistoryList = ({ history }) => {
  let itemToRender = !history ? <div></div>
  : <div>
      {history.map(historyItem => <HistoryListItem history={historyItem}/>)}
    </div>

  return (
    <div>
      {itemToRender}
    </div>
  );
};

export default HistoryList;
