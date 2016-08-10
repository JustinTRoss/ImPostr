import { expect } from 'chai';

import { authNavToggle, AUTH_NAV_TOGGLE } from '../../../client/actions/navActions';

describe('Navigation Actions', () => {
  describe('authNavToggle()', () => {
    it('should create an action to toggle authNav', () => {
      const expectedAction = {
        type: AUTH_NAV_TOGGLE,
      };
      expect(authNavToggle()).to.deep.equal(expectedAction);
    });
  });
});
