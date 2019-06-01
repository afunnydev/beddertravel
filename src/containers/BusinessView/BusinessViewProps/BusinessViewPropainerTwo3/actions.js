/*
 *
 * BusinessViewPropainerTwo actions
 *
 */

import {
  CHANGE_BOOKEDLIST,
  CHANGE_BOOKRESULT,
  CHANGE_BOOKERROR,
  MAKEBOOKING,
} from './constants';

export function changeBookedListAction(bookedList) {
  return {
    type: CHANGE_BOOKEDLIST,
    bookedList,
  };
}
export function changeBookResultAction(bookResult) {
  return {
    type: CHANGE_BOOKRESULT,
    bookResult,
  };
}
export function changeBookErrorAction(bookError) {
  return {
    type: CHANGE_BOOKERROR,
    bookError,
  };
}
export function makeBookingAction(makeBooking) {
  return {
    type: MAKEBOOKING,
    makeBooking,
  };
}
