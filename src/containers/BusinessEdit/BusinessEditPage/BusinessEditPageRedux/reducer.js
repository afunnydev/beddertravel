/*
 *
 * BusinessAddPageRedux reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_RESULT,
  CHANGE_ERROR,
  CHANGE_VALIDATIONERROR,
  CHANGE_SUBMITTING,
  CHANGE_MODEL_ID,
  CHANGE_MODEL_RESULT,
  CHANGE_MODEL_ERROR,
  SUBMIT,
  SUBMIT_MODEL,
  CHANGE_MODEL_STATUS,
  RESET_STATE,
} from './constants';

export const initialState = fromJS({
  result: null,
  error: null,
  validationError: false,
  submitting: false,
  modelId: null,
  modelResult: null,
  modelError: null,
});

function businessAddPageReduxReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_RESULT:
      return state.set('result', action.result).set('submitting', false);
    case CHANGE_ERROR:
      return state.set('error', action.error).set('submitting', false);
    case CHANGE_VALIDATIONERROR:
      return state.set('validationError', action.validationError);
    case CHANGE_SUBMITTING:
      return state.set('submitting', action.submitting);
    case CHANGE_MODEL_ID:
      return state.set('modelId', action.modelId);
    case CHANGE_MODEL_STATUS:
      return state.set('modelStatus', action.modelStatus);
    case CHANGE_MODEL_ERROR:
      return state.set('modelError', action.modelError).set('submitting', false);
    case CHANGE_MODEL_RESULT:
      return state.set('modelResult', action.modelResult).set('submitting', false);
    case SUBMIT:
      return state.set('submitting', true).set('result', null).set('error', null);
    case SUBMIT_MODEL:
      return state.set('submitting', true).set('modelResult', null).set('modelError', null);
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
}

export default businessAddPageReduxReducer;
