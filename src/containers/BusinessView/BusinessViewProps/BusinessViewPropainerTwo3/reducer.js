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
} from './constants';

export const initialState = fromJS({
  bookedList: '',
  bookResult: '',
  bookError: '',
});

function businessViewPropainerTwoReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_BOOKEDLIST:
      return state.set('bookedList', action.bookedList);
    case CHANGE_BOOKRESULT:
      return state.set('bookResult', action.bookResult);
    case CHANGE_BOOKERROR:
      return state.set('bookError', action.bookError);
    case MAKEBOOKING:
      alert('change this makeBooking');
      return state;
    default:
      return state;
  }
}

export default businessViewPropainerTwoReducer;
