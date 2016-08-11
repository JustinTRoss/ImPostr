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
        platform,
      }),
    })
    .then(response => response.json())
    .then(json => {
      dispatch(receivePlatformLogin(platform));
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

export const receiveSettingsFields = (platform, settings, settingId) => ({
  type: RECEIVE_SETTINGS_FIELDS,
  platform,
  settings,
  settingId,
});

export const setSettingsFields = (platformObject, settings) => {
  let { platform, settingId } = platformObject;

  console.log('JSON.stringify({platform, settingId, settings, })', JSON.stringify({platform, settingId, settings, }));
  return dispatch => {
    return fetch('http://127.0.0.1:3000/settings/updateSettings', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        platform,
        settingId,
        settings,
      }),
    })
    .then(response => response.json())
    .then(json => {
      let { interests, interval, isActive, platform, settingId } = json;
      if (json) {
        console.log('platform, settings, settingId', platform, settings, settingId);
        dispatch(receiveSettingsFields(platform, settings, settingId));
      }
    });
  };
};


