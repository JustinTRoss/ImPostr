import React, { Component } from 'react';
import HistoryListItem from './HistoryListItem';
import Paper from 'material-ui/Paper';

const HistoryList = ({ history }) => {
  let itemToRender = !history ? <div></div>
:   <Paper>
      {history.map(historyItem => <HistoryListItem history={historyItem}/>)}
    </Paper>

  return (
    <Paper>
      <p>Posted Items History</p>
      {itemToRender}
    </Paper>
  );
};

export default HistoryList;
