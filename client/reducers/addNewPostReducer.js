import {
  FIELD_CHANGE,
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
    case FIELD_CHANGE:
      switch (action.field) {
        case 'date':
          return Object.assign({}, state, {
            date: action.data,
          });
        case 'time':
          return Object.assign({}, state, {
            time: action.data,
          });
        case 'message':
          return Object.assign({}, state, {
            message: action.data,
          });
        case 'facebook':
          return Object.assign({}, state, {
            facebook: action.data,
          });
        case 'linkedin':
          return Object.assign({}, state, {
            linkedin: action.data,
          });
        case 'twitter':
          return Object.assign({}, state, {
            twitter: action.data,
          });
        default:
          return state;
      }
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
