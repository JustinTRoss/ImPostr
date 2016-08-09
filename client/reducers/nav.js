import { AUTH_NAV_TOGGLE } from '../actions/navActions';

const PageNav = (state = {
  isLogin: true,
}, action) => {
  switch (action.type) {
    case AUTH_NAV_TOGGLE:
      return Object.assign({}, state, {
        isLogin: !state.isLogin,
      });
    default:
      return state;
  }
};

export default PageNav;
