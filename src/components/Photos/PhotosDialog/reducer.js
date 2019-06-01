/*
 *
 * PhotosDialog reducer
 *
 */

import { fromJS } from 'immutable';
import { CHANGE_ASD, DSA } from './constants';

export const initialState = fromJS({
  asd: '',
});

function photosDialogReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_ASD:
      return state.set('asd', action.asd);
    case DSA:
      alert('change this dsa');
      return state;
    default:
      return state;
  }
}

export default photosDialogReducer;
