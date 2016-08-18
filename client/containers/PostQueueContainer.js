import { connect } from 'react-redux';
import PostQueue from '../components/PostQueue';
import { requestRemove } from '../actions/postQueueActions';

const mapStateToProps = (state) => ({
  queuedItems: state.postQueue.queuedItems,
  removedItems: state.postQueue.removedItems,
});

const mapDispatchToProps = (dispatch) => ({
  requestRemove: (post) => { dispatch(requestRemove(post)); },
});

const PostQueueContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostQueue);

export default PostQueueContainer;
