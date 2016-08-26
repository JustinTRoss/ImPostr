import { connect } from 'react-redux';
import PostQueue from '../components/PostQueue';
import { requestRemove } from '../actions/postQueueActions';

const mapStateToProps = (state) => ({
  queuedItems: state.postQueue.queuedItems,
  removedItems: state.postQueue.removedItems,
});

const mapDispatchToProps = (dispatch) => ({
  requestRemove: (post, index) => { dispatch(requestRemove(post, index)); },
});

const PostQueueContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostQueue);

export default PostQueueContainer;
