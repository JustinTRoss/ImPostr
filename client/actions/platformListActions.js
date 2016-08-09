/*
HARD CODED SERVER URLS IN FILE
 */
require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';

export const LOGIN_PLATFORM = 'LOGIN_PLATFORM';
export const LOGOUT_PLATFORM = 'LOGOUT_PLATFORM';
export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const RECEIVE_SETTINGS_FIELDS = 'RECEIVE_SETTINGS_FIELDS';

export const receivePlatformLogin = (platform) => {
  return {
    type: LOGIN_PLATFORM,
    platform,
  };
};

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
      if (json.status !== 'not found') {
        dispatch(receivePlatformLogin(platform));
      }
    });
  };
};

export const logoutPlatform = (platform) => {
  return {
    type: LOGOUT_PLATFORM,
    platform,
  };
};

export const toggleModal = (platform) => {
  return {
    type: TOGGLE_MODAL,
    platform,
  };
};


export const receiveSettingsFields = (platform, settings) => {
  return {
    type: RECEIVE_SETTINGS_FIELDS,
    platform,
    settings,
  };
};

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
      console.log('json ' , json);
      if (json.status !== 'not found') {
        settings.interests = settings.interests.split(', ');
        dispatch(receiveSettingsFields(platform, settings));
      }
    });
  };
};


