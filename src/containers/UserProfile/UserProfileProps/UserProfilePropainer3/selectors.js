import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the userProfilePage3 state domain
 */

const selectUserProfilePage3Domain = state =>
  state.get('userProfilePage3', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by UserProfilePage3
 */

const makeSelectUserProfilePage3 = () =>
  createSelector(selectUserProfilePage3Domain, substate => substate.toJS());

const makeSelectSubmitting = () =>
  createSelector(selectUserProfilePage3Domain, state =>
    state.get('submitting'),
  );

export default makeSelectUserProfilePage3;
export {
  selectUserProfilePage3Domain,
  makeSelectUserProfilePage3,
  makeSelectSubmitting,
};
