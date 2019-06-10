import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the businessEditPage state domain
 */

const selectBusinessEditPageDomain = state =>
  state.get('businessEditPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by BusinessEditPage
 */

const makeSelectBusinessEditPage = () =>
  createSelector(selectBusinessEditPageDomain, substate => substate.toJS());

export default makeSelectBusinessEditPage;
export { selectBusinessEditPageDomain };
