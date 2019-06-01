import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the businessViewPageTwo state domain
 */

const selectBusinessViewPageTwoDomain = state =>
  state.get('businessViewPageTwo', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by BusinessViewPageTwo
 */

const makeSelectBusinessViewPageTwo = () =>
  createSelector(selectBusinessViewPageTwoDomain, substate => substate.toJS());

const makeSelectBookedList = () =>
  createSelector(selectBusinessViewPageTwoDomain, state =>
    state.get('bookedList'),
  );
const makeSelectBookResult = () =>
  createSelector(selectBusinessViewPageTwoDomain, state =>
    state.get('bookResult'),
  );
const makeSelectBookError = () =>
  createSelector(selectBusinessViewPageTwoDomain, state =>
    state.get('bookError'),
  );

export default makeSelectBusinessViewPageTwo;
export {
  selectBusinessViewPageTwoDomain,
  makeSelectBusinessViewPageTwo,
  makeSelectBookedList,
  makeSelectBookResult,
  makeSelectBookError,
};
