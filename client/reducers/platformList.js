import {
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
      //delete the jwt as well
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
      });
    default:
      return state;
  }
};

//all platform list actions are actions on each list item
const PlatformList = (state = [
  {
    platformName: 'facebook',
    userPlatformLoggedIn: false,
    showModal: false,
    settings: {
      autoPilot: false,
      interests: [],
      postFrequency: 0,
    },
  },
  {
    platformName: 'linkedin',
    userPlatformLoggedIn: false,
    showModal: false,
    settings: {
      autoPilot: false,
      interests: [],
      postFrequency: 0,
    },
  },
  {
    platformName: 'twitter',
    userPlatformLoggedIn: false,
    showModal: false,
    settings: {
      autoPilot: false,
      interests: [],
      postFrequency: 0,
    },
  },
], action) => {
  return state.map(platform => {
    if (platform.platformName !== action.platform) {
      return platform;
    }
    return PlatformListEntry(platform, action);
  });
};

export default PlatformList;
