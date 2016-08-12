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
    const token = window.localStorage.getItem('ImPostr-JWT');
    return fetch('http://127.0.0.1:3000/settings/platformlogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`,
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

  return dispatch => {
    const token = window.localStorage.getItem('ImPostr-JWT');
    return fetch('http://127.0.0.1:3000/settings/updateSettings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`,
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

export const getSettingsFields = () => {
  return dispatch => {
    const jwt = window.localStorage.getItem('ImPostr-JWT');
    return fetch('http://127.0.0.1:3000/settings/updateSettings', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${jwt}`,
      },
    })
    .then(response => response.json())
    .then(settingObjAry => {
      let { interests, interval, isActive, platform, settingId, token } = settingObjAry;
      const settings = {
        interests,
        interval,
        isActive,
      };
      for (var i = 0; i < settingObjAry.length; i++) {
        dispatch(receiveSettingsFields(platform, settings, settingId));
        if (token) {
          dispatch(receivePlatformLogin(platform));
        } else {
          dispatch(logoutPlatform(platform));
        }
      });
    });
  };
};

export const updateSettings = () => {

}
