//UI INDUCED ACTION EMITTERS

export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const UPDATE_SETTINGS_FIELD = 'UPDATE_SETTINGS_FIELD';
export const LOGIN_PLATFORM = 'LOGIN_PLATFORM';
export const LOGOUT_PLATFORM = 'LOGOUT_PLATFORM';
export const ADD_PLATFORM = 'ADD_PLATFORM';

//not async
export const toggleModal = (platform) => {
  return {
    type: TOGGLE_MODAL,
    platform,
  };
};

//not async (delete the jwt)
export const logoutPlatform = (platform) => {
  return {
    type: LOGOUT_PLATFORM,
    platform,
  };
};

//not async
export const addPlatform = (platform) => {
  return {
    type: ADD_PLATFORM,
    platform,
  };
};

//async
export const updateSettingsField = (platform, settings) => {
  return {
    type: UPDATE_SETTINGS_FIELD,
    platform,
    settings,
  };
};

//async
export const loginPlatform = (platform) => {
  return {
    type: LOGIN_PLATFORM,
    platform,
  };
};



// export const requestPosts = (reddit) => {
//   return {
//     type: REQUEST_POSTS,
//     reddit
//   }
// }

// export const receivePosts = (reddit, json) => {
//   return {
//     type: RECEIVE_POSTS,
//     reddit,
//     posts: json.data.children.map(child => child.data),
//     receivedAt: Date.now()
//   }
// }

// export const fetchPosts = (reddit) => {
//   return dispatch => {
//     dispatch(requestPosts(reddit))
//     return fetch(`https://www.reddit.com/r/${reddit}.json`)
//       .then(response => response.json())
//       .then(json => dispatch(receivePosts(reddit, json)))
//   }
// }