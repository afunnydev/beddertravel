/*
 *
 * UserProfilePropainer3 actions
 *
 */

import { CHANGE_SUBMITTING, ACTION1, ACTION2 } from './constants';

export function changeSubmittingAction(submitting) {
  return {
    type: CHANGE_SUBMITTING,
    submitting,
  };
}
export function action1Action(action1) {
  return {
    type: ACTION1,
    action1,
  };
}
export function action2Action(action2) {
  return {
    type: ACTION2,
    action2,
  };
}
