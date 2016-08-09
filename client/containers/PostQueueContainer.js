import { connect } from 'react-redux';

import PostQueue from '../components/PostQueue';
import { removeItem, insertItem } from '../actions/platformListActions';

const mapStateToProps = (state) => {
  return {
    queuedItems: state.postQueue.queuedItems,
    removedItems: state.postQueue.removedItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRemoveItemClick: (id) => dispatch(removeItem(id)),
    onInsertItemClick: (id) => dispatch(insertItem(id)),
  };
};

const PostQueueContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostQueue);

export default PostQueueContainer;
