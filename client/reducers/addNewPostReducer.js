import {
  FIELD_CHANGE,
  RESET_FORM,
  VALIDATE_FORM,
} from '../actions/addNewPostActions';

const addNewPost = (state = {
  date: null,
  time: null,
  message: '',
  facebook: false,
  linkedin: false,
  twitter: false,
  isValid: false,
  formFeedback: '',
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
    case VALIDATE_FORM:
      const { date, time, message, facebook, linkedin, twitter } = action.fields;
      let feedback = '';
      if (!date) {
        feedback = 'Please enter a date';
      } else if (new Date(date) < new Date()) {
        feedback = 'Please enter a date in the future';
      } else if (!time) {
        feedback = 'Please enter a time';
      } else if (!message) {
        feedback = 'Please enter a message';
      } else if (!facebook && !linkedin && !twitter) {
        feedback = 'Please select atleast one platform you are connected to';
      }

      if (feedback === '') {
        return Object.assign({}, state, {
          isValid: true,
        });
      }
      return Object.assign({}, state, {
        formFeedback: feedback,
      });

    case RESET_FORM:
      return {
        date: null,
        time: null,
        message: '',
        facebook: false,
        linkedin: false,
        twitter: false,
        isValid: false,
        formFeedback: '',
      };
    default:
      return state;
  }
};

export default addNewPost;
