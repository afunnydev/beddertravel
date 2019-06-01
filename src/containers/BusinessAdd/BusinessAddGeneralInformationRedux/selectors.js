import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the businessAddGeneralInformationRedux state domain
 */

const selectBusinessAddGeneralInformationReduxDomain = state =>
  state.get('businessAddGeneralInformationRedux', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by BusinessAddGeneralInformationRedux
 */

const makeSelectBusinessAddGeneralInformationRedux = () =>
  createSelector(selectBusinessAddGeneralInformationReduxDomain, substate =>
    substate.toJS(),
  );

const makeSelectName = () =>
  createSelector(selectBusinessAddGeneralInformationReduxDomain, state =>
    state.get('name'),
  );
const makeSelectMood = () =>
  createSelector(selectBusinessAddGeneralInformationReduxDomain, state =>
    state.get('mood'),
  );
const makeSelectPropertyType = () =>
  createSelector(selectBusinessAddGeneralInformationReduxDomain, state =>
    state.get('propertyType'),
  );
const makeSelectStars = () =>
  createSelector(selectBusinessAddGeneralInformationReduxDomain, state =>
    state.get('stars'),
  );
const makeSelectLocation = () =>
  createSelector(selectBusinessAddGeneralInformationReduxDomain, state =>
    state.get('location'),
  );
const makeSelectAmenities = () =>
  createSelector(selectBusinessAddGeneralInformationReduxDomain, state =>
    state.get('amenities'),
  );
const makeSelectAmenityAirConditioner = () =>
  createSelector(selectBusinessAddGeneralInformationReduxDomain, state =>
    state.get('amenityAirConditioner'),
  );
const makeSelectAmenityFitness = () =>
  createSelector(selectBusinessAddGeneralInformationReduxDomain, state =>
    state.get('amenityFitness'), 
  );
const makeSelectAmenitySpa = () =>
  createSelector(selectBusinessAddGeneralInformationReduxDomain, state =>
    state.get('amenitySpa'),
  );
const makeSelectLocationLat = () =>
  createSelector(selectBusinessAddGeneralInformationReduxDomain, state =>
    state.get('locationLat'),
  );
const makeSelectLocationLng = () =>
  createSelector(selectBusinessAddGeneralInformationReduxDomain, state =>
    state.get('locationLng'),
  );
const makeSelectOpinionStrong = () =>
  createSelector(selectBusinessAddGeneralInformationReduxDomain, state =>
    state.get('opinionStrong'),
  );
const makeSelectOpinionWeak = () =>
  createSelector(selectBusinessAddGeneralInformationReduxDomain, state =>
    state.get('opinionWeak'),
  );
const makeSelectAround = () =>
  createSelector(selectBusinessAddGeneralInformationReduxDomain, state =>
    state.get('around'),
  );
const makeSelectHowToFind = () =>
  createSelector(selectBusinessAddGeneralInformationReduxDomain, state =>
    state.get('howToFind'),
  );
const makeSelectActivities = () =>
  createSelector(selectBusinessAddGeneralInformationReduxDomain, state =>
    state.get('activities'),
  );
const makeSelectCoverPhoto = () =>
  createSelector(selectBusinessAddGeneralInformationReduxDomain, state =>
    state.get('coverPhoto'),
  );

  const makeSelectEmail = () =>
  createSelector(selectBusinessAddGeneralInformationReduxDomain, state =>
    state.get('email'),
  );

export default makeSelectBusinessAddGeneralInformationRedux;
export {
  selectBusinessAddGeneralInformationReduxDomain,
  makeSelectBusinessAddGeneralInformationRedux,
  makeSelectName,
  makeSelectEmail,
  makeSelectActivities,
  makeSelectCoverPhoto,
  makeSelectMood,
  makeSelectPropertyType,
  makeSelectStars,
  makeSelectLocation,
  makeSelectAmenities,
  makeSelectAmenityAirConditioner,
  makeSelectAmenityFitness,
  makeSelectAmenitySpa,
  makeSelectLocationLat,
  makeSelectLocationLng,
  makeSelectOpinionStrong,
  makeSelectOpinionWeak,
  makeSelectAround,
  makeSelectHowToFind,
};
