import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the drawerDialog state domain
 */

const selectDrawerDialogDomain = state =>
  state.get('drawerDialog', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by DrawerDialog
 */

const makeSelectDrawerDialog = () =>
  createSelector(selectDrawerDialogDomain, substate => substate.toJS());

const makeSelectSubmitResult = () =>
  createSelector(selectDrawerDialogDomain, state => state.get('submitResult'));
const makeSelectSubmitError = () =>
  createSelector(selectDrawerDialogDomain, state => state.get('submitError'));
const makeSelectSubmitting = () =>
  createSelector(selectDrawerDialogDomain, state => state.get('submitting'));
const makeSelectSettings = () =>
  createSelector(selectDrawerDialogDomain, state => state.get('settings'));
const makeSelectChanges = () =>
  createSelector(selectDrawerDialogDomain, state => state.get('changes'));

export default makeSelectDrawerDialog;
export {
  selectDrawerDialogDomain,
  makeSelectDrawerDialog,
  makeSelectSubmitResult,
  makeSelectSubmitError,
  makeSelectSubmitting,
  makeSelectSettings,
  makeSelectChanges,
};
