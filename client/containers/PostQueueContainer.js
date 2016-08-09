import { connect } from 'react-redux';
import PostQueue from '../components/PostQueue';
import { removeItem, insertItem } from '../actions/postQueueActions';

const mapStateToProps = (state) => ({
  queuedItems: state.postQueue.queuedItems,
  removedItems: state.postQueue.removedItems,
});

const mapDispatchToProps = (dispatch) => ({
  onInsertItemClick: (id) => dispatch(insertItem(id)),
  onRemoveItemClick: (id) => dispatch(removeItem(id)),
});

const PostQueueContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostQueue);

export default PostQueueContainer;
