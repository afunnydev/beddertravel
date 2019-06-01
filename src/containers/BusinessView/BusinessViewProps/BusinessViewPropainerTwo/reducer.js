/*
 *
 * BusinessViewPropainerTwo reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_BOOKEDLIST,
  CHANGE_BOOKRESULT,
  CHANGE_BOOKERROR,
  MAKEBOOKING,
  CHANGE_BOOKSUBMITTING
} from './constants';

export const initialState = fromJS({
  bookedList: '',
  bookResult: {},
  bookError: {},
  bookSubmitting: {},
});

function businessViewPropainerTwoReducer(state = initialState, action) {
  // console.log('businessViewPropainerTwoReducer action', action)
  switch (action.type) {
    case CHANGE_BOOKEDLIST:
      return state.set('bookedList', action.bookedList);
    case CHANGE_BOOKRESULT:
      if(action.bookResult === null) {
        return state.deleteIn(['bookResult'], action.roomId);
      }
      return state.setIn(['bookResult', action.roomId], action.bookResult)
        .setIn(['bookSubmitting', action.roomId], false);
    case CHANGE_BOOKSUBMITTING:
      return state.setIn(['bookSubmitting', action.roomId], true);
    case CHANGE_BOOKERROR:
      if(action.bookError === null) {
        return state.deleteIn(['bookError'], action.roomId);
      }
      return state.setIn(['bookError', action.roomId], action.bookError)
        .setIn(['bookSubmitting', action.roomId], false);
    case MAKEBOOKING:
      // alert('change this makeBooking');
      return state.setIn(['bookSubmitting', action.roomId], true)
        .deleteIn(['bookResult', action.roomId])
        .deleteIn(['bookError', action.roomId]);
    default:
      return state;
  }
}

export default businessViewPropainerTwoReducer;
