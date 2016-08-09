/*
HARD CODED SERVER URLS IN FILE
 */
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
      }
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
      if (json.status !== 'not found') {
        settings.interests = settings.interests.split(', ');
        dispatch(receiveSettingsFields(platform, settings));
      }
    });
  };
};


