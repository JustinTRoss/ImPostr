import {
  FIELD_CHANGE,
  VALIDATE_FORM,
  LOGIN_PLATFORM,
  LOGOUT_PLATFORM,
  TOGGLE_MODAL,
  RECEIVE_SETTINGS_FIELDS,
} from '../actions/platformListActions';

const PlatformListEntry = (state, action) => {
  switch (action.type) {
    case LOGIN_PLATFORM:
      return Object.assign({}, state, {
        userPlatformLoggedIn: true,
      });
    case LOGOUT_PLATFORM:
      return Object.assign({}, state, {
        userPlatformLoggedIn: false,
      });
    case TOGGLE_MODAL:
      return Object.assign({}, state, {
        showModal: !state.showModal,
      });
    case RECEIVE_SETTINGS_FIELDS:
      return Object.assign({}, state, {
        settings: action.settings,
        settingId: action.settingId,
      });
    case FIELD_CHANGE:
      switch (action.field) {
        case 'isActive':
          const tempIsActive = Object.assign({}, state.settings, {
            isActive: action.data,
          });
          return Object.assign({}, state, {
            settings: tempIsActive,
          });
        case 'interests':
          const tempInterests = Object.assign({}, state.settings, {
            interests: action.data,
          });
          return Object.assign({}, state, {
            settings: tempInterests,
          });
        case 'interval':
          const tempInterval = Object.assign({}, state.settings, {
            interval: action.data,
          });
          return Object.assign({}, state, {
            settings: tempInterval,
          });
        default:
          return state;
      }
    case VALIDATE_FORM:
      const { isActive, interests, interval } = action.fields;
      let feedback = '';
      if (isActive && !interests) {
        feedback = 'Please enter interests';
      } else if (isActive && !(interval >= 1) && !(interval <= 25) && !(typeof interval === 'number')) {
        feedback = 'Please select posts per week 1 - 25';
      }

      if (feedback === '') {
        const tempIsValid = Object.assign({}, state.settings, {
          isValid: true,
          formFeedback: '',
        });
        return Object.assign({}, state, {
          settings: tempIsValid,
        });
      }

      const tempForm = Object.assign({}, state.settings, {
        formFeedback: feedback,
        isValid: false,
      });
      return Object.assign({}, state, {
        settings: tempForm,
      });

    default:
      return state;
  }
};

//all platform list actions are actions on each list item
const PlatformList = (state = [
  {
    platform: 'facebook',
    settingId: null,
    userPlatformLoggedIn: false,
    showModal: false,
    settings: {
      isActive: false,
      interests: '',
      interval: 5,
      isValid: false,
      formFeedback: '',
    },
  },
  {
    platform: 'linkedin',
    settingId: null,
    userPlatformLoggedIn: false,
    showModal: false,
    settings: {
      isActive: false,
      interests: '',
      interval: 5,
      isValid: false,
      formFeedback: '',
    },
  },
  {
    platform: 'twitter',
    settingId: null,
    userPlatformLoggedIn: false,
    showModal: false,
    settings: {
      isActive: false,
      interests: '',
      interval: 5,
      isValid: false,
      formFeedback: '',
    },
  },
], action) => {
  return state.map(platform => {
    if (platform.platform !== action.platform) {
      return platform;
    }
    return PlatformListEntry(platform, action);
  });
};

export default PlatformList;
