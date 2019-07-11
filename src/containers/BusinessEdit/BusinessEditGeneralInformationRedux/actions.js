import {
  CHANGE_NAME,
  CHANGE_MOOD,
  CHANGE_PROPERTYTYPE,
  CHANGE_STARS,
  CHANGE_LOCATION,
  CHANGE_AMENITIES,
  CHANGE_LOCATIONLAT,
  CHANGE_LOCATIONLNG,
  LOCATIONAPPLY,
  CHANGE_OPINIONSTRONG,
  CHANGE_OPINIONWEAK,
  CHANGE_AROUND,
  CHANGE_HOWTOFIND,
  PROCESS_MODEL,
  CHANGE_ACTIVITIES,
  ADD_COVER_PHOTO,
  REMOVE_COVER_PHOTO
} from './constants';

export function processModelAction(processModel) {
  return {
    type: PROCESS_MODEL,
    processModel,
  };
}

export function changeOpinionStrongAction(opinionStrong) {
  return {
    type: CHANGE_OPINIONSTRONG,
    opinionStrong,
  };
}
export function changeOpinionWeakAction(opinionWeak) {
  return {
    type: CHANGE_OPINIONWEAK,
    opinionWeak,
  };
}
export function changeAroundAction(around) {
  return {
    type: CHANGE_AROUND,
    around,
  };
}
export function changeActivitiesAction(activities) {
  return {
    type: CHANGE_ACTIVITIES,
    activities,
  };
}
export function addCoverPhotoAction(coverPhoto) {
  return {
    type: ADD_COVER_PHOTO,
    coverPhoto,
  };
}
export function removeCoverPhotoAction(coverPhoto) {
  return {
    type: REMOVE_COVER_PHOTO,
    coverPhoto,
  };
}
export function changeHowToFindAction(howToFind) {
  return {
    type: CHANGE_HOWTOFIND,
    howToFind,
  };
}
export function changeNameAction(name) {
  return {
    type: CHANGE_NAME,
    name,
  };
}
export function changeMoodAction(mood) {
  return {
    type: CHANGE_MOOD,
    mood,
  };
}
export function changePropertyTypeAction(propertyType) {
  return {
    type: CHANGE_PROPERTYTYPE,
    propertyType,
  };
}
export function changeStarsAction(stars) {
  return {
    type: CHANGE_STARS,
    stars,
  };
}
export function changeLocationAction(location) {
  return {
    type: CHANGE_LOCATION,
    location,
  };
}
export function changeAmenitiesAction(amenities) {
  return {
    type: CHANGE_AMENITIES,
    amenities,
  };
}
export function changeLocationLatAction(locationLat) {
  return {
    type: CHANGE_LOCATIONLAT,
    locationLat,
  };
}
export function changeLocationLngAction(locationLng) {
  return {
    type: CHANGE_LOCATIONLNG,
    locationLng,
  };
}
export function locationApplyAction() {
  return {
    type: LOCATIONAPPLY,
  };
}
