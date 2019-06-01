import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the myAdsPage state domain
 */

const selectMyAdsPageDomain = state => state.get('myAdsPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by MyAdsPage
 */

const makeSelectMyAdsPage = () =>
  createSelector(selectMyAdsPageDomain, substate => substate.toJS());

export default makeSelectMyAdsPage;
export { selectMyAdsPageDomain };
