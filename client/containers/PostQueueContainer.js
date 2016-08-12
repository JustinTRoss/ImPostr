import { connect } from 'react-redux';
import PostQueue from '../components/PostQueue';
import { removeItem, insertItem, insertQueue, requestRemove } from '../actions/postQueueActions';

const mapStateToProps = (state) => ({
  queuedItems: state.postQueue.queuedItems,
  removedItems: state.postQueue.removedItems,
});

const mapDispatchToProps = (dispatch) => ({
  onInsertItemClick: (postId, index) => {
    dispatch(requestRemove({
      postId,
      isActive: 't',
      index,
    }));
  },

  onRemoveItemClick: (postId, index) => {
    dispatch(requestRemove({
      postId,
      isActive: 'f',
      index,
    }));
  },
});

const PostQueueContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostQueue);

export default PostQueueContainer;
