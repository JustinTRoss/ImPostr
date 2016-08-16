import { RECEIVE_USER_HISTORY } from '../actions/historyListActions';

const historyList = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_USER_HISTORY:
      let { history } = action;
      return Object.assign({}, state, {
        history,
      });
    default:
      return state;
  }
};

export default historyList;
