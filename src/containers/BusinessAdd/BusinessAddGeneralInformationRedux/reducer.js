/*
 *
 * BusinessAddGeneralInformationRedux reducer
 *
 */

import { fromJS } from 'immutable';
import BedderConfig from 'bedder/bedderConfig';
import {
  CHANGE_NAME,
  CHANGE_MOOD,
  CHANGE_PROPERTYTYPE,
  CHANGE_STARS,
  CHANGE_LOCATION,
  CHANGE_AMENITIES,
  CHANGE_AMENITYAIRCONDITIONER,
  CHANGE_AMENITYFITNESS,
  CHANGE_AMENITYSPA,
  CHANGE_LOCATIONLAT,
  CHANGE_LOCATIONLNG,
  CHANGE_OPINIONSTRONG,
  CHANGE_OPINIONWEAK,
  CHANGE_AROUND,
  CHANGE_HOWTOFIND,
  CHANGE_EMAIL,
  LOCATIONAPPLY,
  PROCESS_MODEL,
  CHANGE_ACTIVITIES,
  CHANGE_COVER_PHOTO,
  ADD_COVER_PHOTO,
  REMOVE_COVER_PHOTO,
} from './constants';

export const initialState = fromJS({
  name: '',
  mood: '',
  email: '',
  propertyType: '',
  stars: 5,
  location: '',
  amenities: BedderConfig.getAmenities(),
  amenityAirConditioner: false,
  amenityFitness: false,
  amenitySpa: false,
  locationLat: 45.557874,
  locationLng: -73.870052,
  opinionStrong: '',
  opinionWeak: '',
  around: '',
  howToFind: '',
  activities: '',
  coverPhoto: [],
});

function businessAddGeneralInformationReduxReducer(
  state = initialState,
  action,
) {
  let coverPhoto = state.get('coverPhoto');
  switch (action.type) {
    case CHANGE_NAME:
      return state.set('name', action.name);
    case CHANGE_EMAIL:
      return state.set('email', action.email);
    case CHANGE_MOOD:
      return state.set('mood', action.mood);
    case CHANGE_PROPERTYTYPE:
      return state.set('propertyType', action.propertyType);
    case CHANGE_STARS:
      return state.set('stars', action.stars);
    case CHANGE_LOCATION:
      return state.set('location', action.location);
    case CHANGE_ACTIVITIES:
      return state.set('activities', action.activities);
    case CHANGE_COVER_PHOTO:
      return state.set('coverPhoto', action.coverPhoto);
    case ADD_COVER_PHOTO:
      if (!Array.isArray(coverPhoto)) return state;
      return state.set('coverPhoto', [ ...coverPhoto, action.coverPhoto]);
    case REMOVE_COVER_PHOTO:
      if (!coverPhoto.length || !Array.isArray(coverPhoto)) return state;
      coverPhoto.splice(action.coverPhoto, 1);
      return state.set('coverPhoto', [ ...coverPhoto]);
    case CHANGE_AMENITIES:
      return state
        .update('amenities', amenities =>
          amenities.set(
            action.amenities,
            !amenities.get(action.amenities),
          ),
        );
      // return state.set('amenities', action.amenities);
    case CHANGE_AMENITYAIRCONDITIONER:
      return state
        .set('amenityAirConditioner', !state.get('amenityAirConditioner'))
        .update('amenities', amenities =>
          amenities.set(
            'amenityAirConditioner',
            !amenities.get('amenityAirConditioner'),
          ),
        );
    case CHANGE_AMENITYFITNESS:
      return state
        .set('amenityFitness', !state.get('amenityFitness'))
        .update('amenities', amenities =>
          amenities.set('amenityFitness', !amenities.get('amenityFitness')),
        );
    case CHANGE_AMENITYSPA:
      return state
        .set('amenitySpa', !state.get('amenitySpa'))
        .update('amenities', amenities =>
          amenities.set('amenitySpa', !amenities.get('amenitySpa')),
        );
    case CHANGE_LOCATIONLAT:
      return state.set('locationLat', action.locationLat);
    case CHANGE_LOCATIONLNG:
      return state.set('locationLng', action.locationLng);
    case CHANGE_OPINIONSTRONG:
      return state.set('opinionStrong', action.opinionStrong);
    case CHANGE_OPINIONWEAK:
      return state.set('opinionWeak', action.opinionWeak);
    case CHANGE_AROUND:
      return state.set('around', action.around);
    case CHANGE_HOWTOFIND:
      return state.set('howToFind', action.howToFind);
    case PROCESS_MODEL:
      const processModel = action.processModel.result.business;

      return state
        .set('name', processModel.name ? processModel.name : '')
        .set('mood', processModel.mood ? processModel.mood : '')
        .set(
          'propertyType',
          processModel.propertyType ? processModel.propertyType : '',
        )
        .set('stars', processModel.stars ? processModel.stars : '')
        .set('location', processModel.address ? processModel.address.address : null)
        .set('activities', processModel.activities ? processModel.activites : '')
        .set('email', processModel.address ? processModel.address.email : null)
        .set('amenities', processModel.amenities ? fromJS(processModel.amenities) : fromJS(BedderConfig.getAmenities()))
        .set('amenityAirConditioner', processModel.amenities && processModel.amenities.amenityAirCo)
        .set('amenityFitness', processModel.amenities && processModel.amenities.amenityFitness)
        .set('amenitySpa', processModel.amenities && processModel.amenities.amenitySpa)
        .set('locationLat', processModel.address && processModel.address.lat)
        .set('locationLng', processModel.address && processModel.address.lon)
        .set('coverPhoto', processModel.coverPhoto ? processModel.coverPhoto : [])
        .set(
          'opinionStrong',
          processModel.opinionStrong ? processModel.opinionStrong : '',
        )
        .set(
          'opinionWeak',
          processModel.opinionWeak ? processModel.opinionWeak : '',
        )
        .set('around', processModel.around ? processModel.around : '')
        .set('howToFind', processModel.howToFind ? processModel.howToFind : '');
    case LOCATIONAPPLY:
      return initialState;
    default:
      return state;
  }
}

export default businessAddGeneralInformationReduxReducer;
