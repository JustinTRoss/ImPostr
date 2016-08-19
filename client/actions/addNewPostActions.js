import fetch from 'isomorphic-fetch';
import { polyfill } from 'es6-promise';

import { requestQueue } from './postQueueActions';

polyfill();

export const FIELD_CHANGE = 'FIELD_CHANGE';
export const RESET_FORM = 'RESET_FORM';
export const VALIDATE_FORM = 'VALIDATE_FORM';

export const handleFieldChange = (field, data) => ({
  type: FIELD_CHANGE,
  field,
  data,
});

export const resetForm = () => ({
  type: RESET_FORM,
});

export const validateForm = (fields) => ({
  type: VALIDATE_FORM,
  fields,
});

export const handleFormSubmit = (post) => {
  return (dispatch, getState) => {
    const { userLogin: { token } } = getState();
    return fetch('http://127.0.0.1:3000/post/addNewFromUser', {
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
    .then(res => {
      if (res.status) {
        dispatch(requestQueue());
      }
    });
  };
};
