import {
  DATE_CHANGE,
  TIME_CHANGE,
  MESSAGE_CHANGE,
  FACEBOOK_CHANGE,
  LINKEDIN_CHANGE,
  TWITTER_CHANGE,
} from '../actions/addNewPostActions';

const addNewPost = (state = {
  date: new Date(),
  time: new Date(),
  message: '',
  facebook: false,
  linkedin: false,
  twitter: false,
}, action) => {
  switch (action.type) {
    case DATE_CHANGE:
      return Object.assign({}, state, {
        date: action.date,
      });
    case TIME_CHANGE:
      return Object.assign({}, state, {
        time: action.time,
      });
    case MESSAGE_CHANGE:
      return Object.assign({}, state, {
        message: action.message,
      });
    case FACEBOOK_CHANGE:
      return Object.assign({}, state, {
        facebook: action.status,
      });
    case LINKEDIN_CHANGE:
      return Object.assign({}, state, {
        linkedin: action.status,
      });
    case TWITTER_CHANGE:
      return Object.assign({}, state, {
        twitter: action.status,
      });
    default:
      return state;
  }
};

export default addNewPost;
