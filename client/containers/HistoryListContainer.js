import { connect } from 'react-redux';
import HistoryList from '../components/HistoryList';

const mapStateToProps = (state) => (
  {
    history: state.historyList.history,
  }
);

const HistoryListContainer = connect(mapStateToProps)(HistoryList);

export default HistoryListContainer;
