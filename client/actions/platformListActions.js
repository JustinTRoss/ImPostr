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


export const requestPlatformLogin = (platform, userID, accessToken) => {
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
        userID,
        accessToken,
      }),
    })
    .then(response => response.json())
    .then(json => {
      dispatch(receivePlatformLogin(platform));
    });
  };
};

export const requestFacebookLogin = () => {
  const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/`;
  };

  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].split('=')[0].indexOf('fblo_') !== -1) {
      deleteCookie(cookies[i].split('=')[0]);
    };
  };

  return dispatch => {
    FB.getLoginStatus(response => {
      if (response.status !== 'connected') {
        FB.login(response => {
          const { userID, accessToken } = response.authResponse;
          dispatch(requestPlatformLogin('facebook', userID, accessToken));
        });
      }
    });
  };
};

export const requestLinkedInLogin = () => {
  return dispatch => {
    fetch(`http://localhost:3000/auth/linkedin`)
      .then(response => console.log(response))
      .catch(err => console.log(err, 'linkedin OAUTH2'));
  };
};

export const selectPlatformLogin = (platform) => {
  return dispatch => {
    if (platform === 'facebook') {
      dispatch(requestFacebookLogin());
    } else if (platform === 'twitter') {
      //dispatch(requestTwitterLogin());
    }
  };
};

export const logoutPlatform = (platform) => ({
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
      dispatch(logoutPlatform(platform));
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
