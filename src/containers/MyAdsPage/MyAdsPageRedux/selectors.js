import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the myAdsPageRedux state domain
 */

const selectMyAdsPageReduxDomain = state =>
  state.get('myAdsPageRedux', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by MyAdsPageRedux
 */

const makeSelectMyAdsPageRedux = () =>
  createSelector(selectMyAdsPageReduxDomain, substate => substate.toJS());

const makeSelectResult = () =>
  createSelector(selectMyAdsPageReduxDomain, state => state.get('result'));
const makeSelectError = () =>
  createSelector(selectMyAdsPageReduxDomain, state => state.get('error'));
const makeSelectSubmitting = () =>
  createSelector(selectMyAdsPageReduxDomain, state => state.get('submitting'));
const makeSelectData = () =>
  createSelector(selectMyAdsPageReduxDomain, state => state.get('data'));

export default makeSelectMyAdsPageRedux;
export {
  selectMyAdsPageReduxDomain,
  makeSelectMyAdsPageRedux,
  makeSelectResult,
  makeSelectError,
  makeSelectSubmitting,
  makeSelectData,
};
