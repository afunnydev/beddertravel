/*
 *
 * SearchBarRedux reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_LOCATION,
  CHANGE_FROM,
  CHANGE_TO,
  CHANGE_NUMPEOPLE,
  CHANGE_NUMBED,
  SUGGESTIONSELECTED,
  HANDLESUBMIT,
  CHANGE_LAT,
  CHANGE_LON,
} from './constants';

import moment from 'moment';

export const initialState = fromJS({
  locationText: 'Montréal',
  from: moment(),
  to: moment().add(3, 'days'),
  numPeople: 2,
  numBed: 1,
  lat: 45.52,
  lon: -73.59,
});

function searchBarReduxReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOCATION:
      return state.set('locationText', action.location);
    case CHANGE_LAT:
      return state.set('lat', action.lat);
    case CHANGE_LON:
      return state.set('lon', action.lon);
    case CHANGE_FROM:
      return state.set('from', action.from);
    case CHANGE_TO:
      return state.set('to', action.to);
    case CHANGE_NUMPEOPLE:
      return state.set('numPeople', action.numPeople);
    case CHANGE_NUMBED:
      return state.set('numBed', action.numBed);
    case SUGGESTIONSELECTED:
      // alert('change this suggestionSelected');
      return state;
    case HANDLESUBMIT:
      // alert('change this handleSubmit');
      return state;
    default:
      return state;
  }
}

export default searchBarReduxReducer;
