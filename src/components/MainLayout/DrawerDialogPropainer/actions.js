/*
 *
 * DrawerDialogPropainer actions
 *
 */

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

export function changeSubmitResultAction(submitResult) {
  return {
    type: CHANGE_SUBMITRESULT,
    submitResult,
  };
}
export function changeSubmitErrorAction(submitError) {
  return {
    type: CHANGE_SUBMITERROR,
    submitError,
  };
}
export function changeSubmittingAction(submitting) {
  return {
    type: CHANGE_SUBMITTING,
    submitting,
  };
}
export function changeSettingsAction(settings) {
  return {
    type: CHANGE_SETTINGS,
    settings,
  };
}
export function changeChangesAction(changes) {
  return {
    type: CHANGE_CHANGES,
    changes,
  };
}
export function submitAction(submit) {
  return {
    type: SUBMIT,
    submit,
  };
}
export function processAction(process) {
  return {
    type: PROCESS,
    process,
  };
}
export function changeAction(change) {
  return {
    type: CHANGE,
    change,
  };
}
