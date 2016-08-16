import {
  DATE_CHANGE,
  TIME_CHANGE,
  MESSAGE_CHANGE,
  FACEBOOK_CHANGE,
  LINKEDIN_CHANGE,
  TWITTER_CHANGE,
  RESET_FORM,
} from '../actions/addNewPostActions';

const addNewPost = (state = {
  date: null,
  time: null,
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
    case RESET_FORM:
      return {
        date: null,
        time: null,
        message: '',
        facebook: false,
        linkedin: false,
        twitter: false,
      };
    default:
      return state;
  }
};

export default addNewPost;
