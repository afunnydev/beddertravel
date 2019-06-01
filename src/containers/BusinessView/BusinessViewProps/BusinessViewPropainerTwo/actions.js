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
  CHANGE_BOOKSUBMITTING,
} from './constants';

export function changeBookedListAction(bookedList) {
  return {
    type: CHANGE_BOOKEDLIST,
    bookedList,
  };
}
export function changeBookResultAction(bookResult, roomId) {
  // console.log('changeBookResultAction roomId', roomId);
  return {
    type: CHANGE_BOOKRESULT,
    bookResult,
    roomId,
  };
}
export function changeBookErrorAction(bookError, roomId) {
  return {
    type: CHANGE_BOOKERROR,
    bookError,
    roomId,
  };
}
export function changeBookSubmittingAction(bookSubmitting, roomId) {
  return {
    type: CHANGE_BOOKERROR,
    bookSubmitting,
    roomId,
  };
}
export function makeBookingAction(roomId, numRooms, payload, stripeToken) {
  return {
    type: MAKEBOOKING,
    roomId,
    numRooms,
    payload,
    stripeToken,
  };
}
