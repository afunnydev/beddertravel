/*
 *
 * SearchBarRedux actions
 *
 */

import {
  CHANGE_LOCATION,
  CHANGE_FROM,
  CHANGE_TO,
  CHANGE_NUMPEOPLE,
  CHANGE_NUMBED,
  SUGGESTIONSELECTED,
  HANDLESUBMIT, CHANGE_LAT, CHANGE_LON,
} from './constants';

export function changeLatAction(lat) {
  return {
    type: CHANGE_LAT,
    lat,
  };
}
export function changeLonAction(lon) {
  return {
    type: CHANGE_LON,
    lon,
  };
}
export function changeLocationAction(location) {
  return {
    type: CHANGE_LOCATION,
    location,
  };
}
export function changeFromAction(from) {
  return {
    type: CHANGE_FROM,
    from,
  };
}
export function changeToAction(to) {
  return {
    type: CHANGE_TO,
    to,
  };
}
export function changeNumPeopleAction(numPeople) {
  return {
    type: CHANGE_NUMPEOPLE,
    numPeople,
  };
}
export function changeNumBedAction(numBed) {
  return {
    type: CHANGE_NUMBED,
    numBed,
  };
}
export function suggestionSelectedAction(suggestionSelected) {
  return {
    type: SUGGESTIONSELECTED,
    suggestionSelected,
  };
}
export function handleSubmitAction(handleSubmit) {
  return {
    type: HANDLESUBMIT,
    handleSubmit,
  };
}
