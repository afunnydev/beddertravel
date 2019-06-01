/*
 *
 * DrawerDialogPropainer reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_SUBMITRESULT,
  CHANGE_SUBMITERROR,
  CHANGE_SUBMITTING,
  CHANGE_SETTINGS,
  CHANGE_CHANGES,
  SUBMIT,
  PROCESS,
  CHANGE,
} from './constants';

export const initialState = fromJS({
  submitResult: '',
  submitError: '',
  submitting: '',
  settings: '',
  changes: '',
});

function drawerDialogPropainerReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SUBMITRESULT:
      return state.set('submitResult', action.submitResult);
    case CHANGE_SUBMITERROR:
      return state.set('submitError', action.submitError);
    case CHANGE_SUBMITTING:
      return state.set('submitting', action.submitting);
    case CHANGE_SETTINGS:
      return state.set('settings', action.settings);
    case CHANGE_CHANGES:
      return state.set('changes', action.changes);
    case SUBMIT:
      // alert('change this submit');
      return state;
    case PROCESS:
      // alert('change this process');
      return state;
    case CHANGE:
      // alert('change this change');
      return state;
    default:
      return state;
  }
}

export default drawerDialogPropainerReducer;
