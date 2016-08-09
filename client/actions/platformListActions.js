/*
HARD CODED SERVER URLS IN FILE
 */

import fetch from 'isomorphic-fetch';

export const LOGIN_PLATFORM = 'LOGIN_PLATFORM';
export const LOGOUT_PLATFORM = 'LOGOUT_PLATFORM';
export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const RECEIVE_SETTINGS_FIELDS = 'RECEIVE_SETTINGS_FIELDS';

export const receivePlatformLogin = (platform, status) => {
  return {
    type: LOGIN_PLATFORM,
    platform,
    status,
  };
};

export const requestPlatformLogin = (platform) => {
  return dispatch => {
    return fetch('http://127.0.0.1:3000/platform/platformLogin', {
      method: 'post',
      body: {
        platform,
      },
    })
    .then(response => response.json())
    .then(json => {
      console.log('json ' , json);
      //json map to status and platform
      dispatch(receivePlatformLogin(platform, status));
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
  return dispatch => {
    return fetch('http://127.0.0.1:3000/platform/setSettingsFields', {
      method: 'put',
      body: {
        platform,
        settings,
      },
    })
    .then(response => response.json())
    .then(json => {
      console.log('json ' , json);
      //json map to settings and platform
      dispatch(receiveSettingsFields(platform, settings));
    });
  };
};


