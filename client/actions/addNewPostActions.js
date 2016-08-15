import fetch from 'isomorphic-fetch';
import { polyfill } from 'es6-promise';

import requestQueue from './postQueueActions';

polyfill();

export const DATE_CHANGE = 'DATE_CHANGE';
export const TIME_CHANGE = 'TIME_CHANGE';
export const MESSAGE_CHANGE = 'MESSAGE_CHANGE';
export const FACEBOOK_CHANGE = 'FACEBOOK_CHANGE';
export const LINKEDIN_CHANGE = 'LINKEDIN_CHANGE';
export const TWITTER_CHANGE = 'TWITTER_CHANGE';

export const handleDateChange = (date) => ({
  type: DATE_CHANGE,
  date,
});

export const handleTimeChange = (time) => ({
  type: TIME_CHANGE,
  time,
});

export const handleMessageChange = (message) => ({
  type: MESSAGE_CHANGE,
  message,
});

export const handleFacebookChange = (status) => ({
  type: FACEBOOK_CHANGE,
  status,
});

export const handleLinkedinChange = (status) => ({
  type: LINKEDIN_CHANGE,
  status,
});

export const handleTwitterChange = (status) => ({
  type: TWITTER_CHANGE,
  status,
});

export const handleFormSubmit = (post) => {
  return dispatch => {
    const token = window.localStorage.getItem('ImPostr-JWT');
    return fetch('http://127.0.0.1:3000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`,
      },
      body: JSON.stringify({
        post,
      }),
    })
    .then(response => response.json())
    .then(json => {
      console.log('create actions based on response', json);
      //validate json response, easy solution, call update queue on response
      dispatch(requestQueue());
    });
  }
}