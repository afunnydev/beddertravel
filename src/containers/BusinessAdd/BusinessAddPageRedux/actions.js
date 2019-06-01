/*
 *
 * BusinessAddPageRedux actions
 *
 */

import {
  CHANGE_RESULT,
  CHANGE_ERROR,
  CHANGE_VALIDATIONERROR,
  CHANGE_SUBMITTING,
  SUBMIT,
  SUBMIT_MODEL,
  CHANGE_MODEL_ID,
  CHANGE_MODEL_RESULT,
  CHANGE_MODEL_ERROR,
  CHANGE_MODEL_STATUS,
  RESET_STATE,
} from './constants';

export function changeModelStatusAction(modelStatus) {
  return {
    type: CHANGE_MODEL_STATUS,
    modelStatus,
  };
}
export function changeModelResultAction(modelResult) {
  return {
    type: CHANGE_MODEL_RESULT,
    modelResult,
  };
}
export function changeModelErrorAction(modelError) {
  return {
    type: CHANGE_MODEL_ERROR,
    modelError,
  };
}
export function changeResultAction(result) {
  return {
    type: CHANGE_RESULT,
    result,
  };
}
export function changeErrorAction(error) {
  return {
    type: CHANGE_ERROR,
    error,
  };
}
export function changeValidationErrorAction(validationError) {
  return {
    type: CHANGE_VALIDATIONERROR,
    validationError,
  };
}
export function changeSubmittingAction(submitting) {
  return {
    type: CHANGE_SUBMITTING,
    submitting,
  };
}
export function changeModelIdAction(modelId) {
  // console.log('changeModelIdAction', modelId);
  return {
    type: CHANGE_MODEL_ID,
    modelId,
  };
}
export function submitAction() {
  return {
    type: SUBMIT,
  };
}
export function submitModelAction() {
  return {
    type: SUBMIT_MODEL,
  };
}
export function resetStateAction() {
  return {
    type: RESET_STATE,
  };
}
