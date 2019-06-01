/*
 *
 * UserProfilePropainer3 reducer
 *
 */

import { fromJS } from 'immutable';
import { CHANGE_SUBMITTING, ACTION1, ACTION2 } from './constants';

export const initialState = fromJS({
  submitting: '',
});

function userProfilePropainer3Reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SUBMITTING:
      return state.set('submitting', action.submitting);
    case ACTION1:
      alert('change this action1');
      return state;
    case ACTION2:
      alert('change this action2');
      return state;
    default:
      return state;
  }
}

export default userProfilePropainer3Reducer;
