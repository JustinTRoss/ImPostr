<<<<<<< HEAD
/*
HARD CODED SERVER URLS IN FILE
 */
=======
>>>>>>> 66a499b2f6191d9d6272b1fe78aeb3caa17892fd
import fetch from 'isomorphic-fetch';
import { polyfill } from 'es6-promise';

polyfill();

export const LOGIN_PLATFORM = 'LOGIN_PLATFORM';
export const LOGOUT_PLATFORM = 'LOGOUT_PLATFORM';
export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const RECEIVE_SETTINGS_FIELDS = 'RECEIVE_SETTINGS_FIELDS';

export const receivePlatformLogin = (platform) => ({
  type: LOGIN_PLATFORM,
  platform,
});

export const requestPlatformLogin = (platform) => {
  console.log('requestPlatformLogin', JSON.stringify({
    platform: platform,
  }));
  return dispatch => {
    return fetch('http://127.0.0.1:3000/platform/platformlogin', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        platform: platform,
      }),
    })
    .then(response => response.json())
    .then(json => {
        dispatch(receivePlatformLogin(platform));
<<<<<<< HEAD
      }
=======
>>>>>>> 66a499b2f6191d9d6272b1fe78aeb3caa17892fd
    });
  };
};

export const logoutPlatform = (platform) => ({
  type: LOGOUT_PLATFORM,
  platform,
});

export const toggleModal = (platform) => ({
  type: TOGGLE_MODAL,
  platform,
});

export const receiveSettingsFields = (platform, settings) => ({
  type: RECEIVE_SETTINGS_FIELDS,
  platform,
  settings,
});

export const setSettingsFields = (platform, settings) => {
  console.log('setSettingsFields ' , JSON.stringify({
    platform: platform,
    settings: settings,
  }));
  return dispatch => {
    return fetch('http://127.0.0.1:3000/platform/updatesettings', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        platform: platform,
        settings: settings,
      }),
    })
    .then(response => response.json())
    .then(json => {
<<<<<<< HEAD
      if (json.status !== 'not found') {
=======
      if (json.status === 'FB settings updated') {
>>>>>>> 66a499b2f6191d9d6272b1fe78aeb3caa17892fd
        settings.interests = settings.interests.split(', ');
        dispatch(receiveSettingsFields(platform, settings));
      }
    });
  };
};


