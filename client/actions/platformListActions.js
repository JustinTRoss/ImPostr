import fetch from 'isomorphic-fetch';
import { polyfill } from 'es6-promise';

polyfill();

export const VALIDATE_FORM = 'VALIDATE_FORM';
export const FIELD_CHANGE = 'FIELD_CHANGE';
export const LOGIN_PLATFORM = 'LOGIN_PLATFORM';
export const LOGOUT_PLATFORM = 'LOGOUT_PLATFORM';
export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const RECEIVE_SETTINGS_FIELDS = 'RECEIVE_SETTINGS_FIELDS';

export const validateForm = (platform, fields) => ({
  type: VALIDATE_FORM,
  platform,
  fields,
});

export const handleFieldChange = (platform, field, data) => ({
  type: FIELD_CHANGE,
  platform,
  field,
  data,
});

export const receivePlatformLogin = (platform) => ({
  type: LOGIN_PLATFORM,
  platform,
});

export const receivePlatformLogout = (platform) => ({
  type: LOGOUT_PLATFORM,
  platform,
});

export const requestPlatformLogout = (platform) => {
  return dispatch => {
    const token = window.localStorage.getItem('ImPostr-JWT');
    return fetch('http://127.0.0.1:3000/settings/requestPlatformLogout', {
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
      //validate json response
      dispatch(receivePlatformLogout(platform));
    });
  };
};

export const requestFacebookLogout = () => {
  return dispatch => {
    FB.getLoginStatus(response => {
      if (response.status === 'connected') {
        FB.logout();
      }
      dispatch(requestPlatformLogout('facebook'));
    });
  };
};

export const selectPlatformLogout = (platform) => {
  return dispatch => {
    if (platform === 'facebook') {
      dispatch(requestFacebookLogout());
    } else {
      dispatch(requestPlatformLogout(platform));
    }
  };
};

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
      dispatch(receiveSettingsFields(platform, settings, settingId));
    });
  };
};

export const getSettingsFields = () => {
  return dispatch => {
    const token = window.localStorage.getItem('ImPostr-JWT');
    return fetch('http://127.0.0.1:3000/settings/getSettings', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`,
      },
    })
    .then(response => response.json())
    .then(settingObjAry => {
      for (var i = 0; i < settingObjAry.length; i++) {
        let { interests, interval, isActive, platform, settingId, token } = settingObjAry[i];
        let settings = {
          interests,
          interval,
          isActive,
        };
        dispatch(receiveSettingsFields(platform, settings, settingId));
        if (token) {
          dispatch(receivePlatformLogin(platform));
        }
      }
    });
  };
};
