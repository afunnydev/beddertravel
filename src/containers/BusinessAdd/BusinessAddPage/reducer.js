/*
 *
 * BusinessAddPage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION } from './constants';
import { CHANGE_AMENITYSPA } from '../BusinessAddGeneralInformationRedux/constants';

export const initialState = fromJS({});

function businessAddPageReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_AMENITYSPA:
      // alert('ohyeah', action);
      return state.set('amenitySpa', action.amenitySpa);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default businessAddPageReducer;
