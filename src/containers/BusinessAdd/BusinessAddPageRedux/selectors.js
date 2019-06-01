import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the businessAddPageRedux state domain
 */

const selectBusinessAddPageReduxDomain = state =>
  state.get('businessAddPageRedux', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by BusinessAddPageRedux
 */

const makeSelectBusinessAddPageRedux = () =>
  createSelector(selectBusinessAddPageReduxDomain, substate => substate.toJS());

const makeSelectResult = () =>
  createSelector(selectBusinessAddPageReduxDomain, state =>
    state.get('result'),
  );
const makeSelectError = () =>
  createSelector(selectBusinessAddPageReduxDomain, state => state.get('error'));
const makeSelectValidationError = () =>
  createSelector(selectBusinessAddPageReduxDomain, state =>
    state.get('validationError'),
  );
const makeSelectModelId = () =>
  createSelector(selectBusinessAddPageReduxDomain, state =>
    state.get('modelId'),
  );
const makeSelectModelStatus = () =>
  createSelector(selectBusinessAddPageReduxDomain, state =>
    state.get('modelStatus'),
  );
const makeSelectModelResult = () =>
  createSelector(selectBusinessAddPageReduxDomain, state =>
    state.get('modelResult'),
  );
const makeSelectModelError = () =>
  createSelector(selectBusinessAddPageReduxDomain, state =>
    state.get('modelError'),
  );
const makeSelectSubmitting = () =>
  createSelector(selectBusinessAddPageReduxDomain, state =>
    state.get('submitting'),
  );

export default makeSelectBusinessAddPageRedux;
export {
  selectBusinessAddPageReduxDomain,
  makeSelectBusinessAddPageRedux,
  makeSelectResult,
  makeSelectError,
  makeSelectValidationError,
  makeSelectModelId,
  makeSelectSubmitting,
  makeSelectModelResult,
  makeSelectModelError,
  makeSelectModelStatus,
};
