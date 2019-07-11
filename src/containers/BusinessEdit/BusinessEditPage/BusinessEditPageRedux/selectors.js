import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the businessEditPageRedux state domain
 */

const selectBusinessEditPageReduxDomain = state =>
  state.get('businessEditPageRedux', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by BusinessEditPageRedux
 */

const makeSelectBusinessEditPageRedux = () =>
  createSelector(selectBusinessEditPageReduxDomain, substate => substate.toJS());

const makeSelectResult = () =>
  createSelector(selectBusinessEditPageReduxDomain, state =>
    state.get('result'),
  );
const makeSelectError = () =>
  createSelector(selectBusinessEditPageReduxDomain, state => state.get('error'));
const makeSelectValidationError = () =>
  createSelector(selectBusinessEditPageReduxDomain, state =>
    state.get('validationError'),
  );
const makeSelectModelId = () =>
  createSelector(selectBusinessEditPageReduxDomain, state =>
    state.get('modelId'),
  );
const makeSelectModelStatus = () =>
  createSelector(selectBusinessEditPageReduxDomain, state =>
    state.get('modelStatus'),
  );
const makeSelectModelResult = () =>
  createSelector(selectBusinessEditPageReduxDomain, state =>
    state.get('modelResult'),
  );
const makeSelectModelError = () =>
  createSelector(selectBusinessEditPageReduxDomain, state =>
    state.get('modelError'),
  );
const makeSelectSubmitting = () =>
  createSelector(selectBusinessEditPageReduxDomain, state =>
    state.get('submitting'),
  );

export default makeSelectBusinessEditPageRedux;
export {
  selectBusinessEditPageReduxDomain,
  makeSelectBusinessEditPageRedux,
  makeSelectResult,
  makeSelectError,
  makeSelectValidationError,
  makeSelectModelId,
  makeSelectSubmitting,
  makeSelectModelResult,
  makeSelectModelError,
  makeSelectModelStatus,
};
