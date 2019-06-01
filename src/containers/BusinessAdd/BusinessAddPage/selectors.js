import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the businessAddPage state domain
 */

const selectBusinessAddPageDomain = state =>
  state.get('businessAddPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by BusinessAddPage
 */

const makeSelectBusinessAddPage = () =>
  createSelector(selectBusinessAddPageDomain, substate => substate.toJS());

export default makeSelectBusinessAddPage;
export { selectBusinessAddPageDomain };
