import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the businessEditGeneralInformationRedux state domain
 */

const selectBusinessEditGeneralInformationReduxDomain = state =>
  state.get('businessEditGeneralInformationRedux', initialState);

/**
 * Default selector used by BusinessEditGeneralInformationRedux
 */

const makeSelectBusinessEditGeneralInformationRedux = () =>
  createSelector(selectBusinessEditGeneralInformationReduxDomain, substate =>
    substate.toJS(),
  );
const makeSelectName = () =>
  createSelector(selectBusinessEditGeneralInformationReduxDomain, state =>
    state.get('name'),
  );
const makeSelectMood = () =>
  createSelector(selectBusinessEditGeneralInformationReduxDomain, state =>
    state.get('mood'),
  );
const makeSelectPropertyType = () =>
  createSelector(selectBusinessEditGeneralInformationReduxDomain, state =>
    state.get('propertyType'),
  );
const makeSelectStars = () =>
  createSelector(selectBusinessEditGeneralInformationReduxDomain, state =>
    state.get('stars'),
  );
const makeSelectLocation = () =>
  createSelector(selectBusinessEditGeneralInformationReduxDomain, state =>
    state.get('location'),
  );
const makeSelectAmenities = () =>
  createSelector(selectBusinessEditGeneralInformationReduxDomain, state =>
    state.get('amenities'),
  );
const makeSelectLocationLat = () =>
  createSelector(selectBusinessEditGeneralInformationReduxDomain, state =>
    state.get('locationLat'),
  );
const makeSelectLocationLng = () =>
  createSelector(selectBusinessEditGeneralInformationReduxDomain, state =>
    state.get('locationLng'),
  );
const makeSelectOpinionStrong = () =>
  createSelector(selectBusinessEditGeneralInformationReduxDomain, state =>
    state.get('opinionStrong'),
  );
const makeSelectOpinionWeak = () =>
  createSelector(selectBusinessEditGeneralInformationReduxDomain, state =>
    state.get('opinionWeak'),
  );
const makeSelectAround = () =>
  createSelector(selectBusinessEditGeneralInformationReduxDomain, state =>
    state.get('around'),
  );
const makeSelectHowToFind = () =>
  createSelector(selectBusinessEditGeneralInformationReduxDomain, state =>
    state.get('howToFind'),
  );
const makeSelectActivities = () =>
  createSelector(selectBusinessEditGeneralInformationReduxDomain, state =>
    state.get('activities'),
  );
const makeSelectCoverPhotos = () =>
  createSelector(selectBusinessEditGeneralInformationReduxDomain, state =>
    state.get('coverPhotos'),
  );

export default makeSelectBusinessEditGeneralInformationRedux;
export {
  selectBusinessEditGeneralInformationReduxDomain,
  makeSelectBusinessEditGeneralInformationRedux,
  makeSelectName,
  makeSelectActivities,
  makeSelectCoverPhotos,
  makeSelectMood,
  makeSelectPropertyType,
  makeSelectStars,
  makeSelectLocation,
  makeSelectAmenities,
  makeSelectLocationLat,
  makeSelectLocationLng,
  makeSelectOpinionStrong,
  makeSelectOpinionWeak,
  makeSelectAround,
  makeSelectHowToFind,
};
