/*
 *
 * BusinessViewPropainerOne reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_GETRESULT,
  CHANGE_GETRESULTMODEL,
  CHANGE_GETERROR,
  CHANGE_GETSUBMITTING,
  CHANGE_MODELID,
  CHANGE_BPHOTOS,
  CHANGE_BPHOTOACTIVE,
  CHANGE_BNAME,
  CHANGE_BLOCATION,
  CHANGE_BREVIEWSCORE,
  CHANGE_BREVIEWSCOUNT,
  CHANGE_BREVIEWSTEXT,
  CHANGE_BAMENITIES,
  CHANGE_BROOMS,
  CHANGE_BSTARS,
  CHANGE_BOPINIONSTRONG,
  CHANGE_BOPINIONWEAK,
  CHANGE_BACTIVITIES,
  CHANGE_BHOSTUSER,
  BSHARE,
  BASKQUESTION,
  BREPORT,
  SUBMITGET,
  PROCESSMODEL,
} from './constants';

export const initialState = fromJS({
  getResult: null,
  getResultModel: null,
  getError: null,
  getSubmitting: null,
  modelId: null,
  bPhotos: '',
  bPhotoActive: '',
  bName: '',
  bStars: '',
  bLocation: '',
  bReviewScore: '',
  bReviewsCount: '',
  bReviewsText: '',
  bAmenities: '',
  bRooms: '',
  bOpinionStrong: '',
  bOpinionWeak: '',
  bActivities: '',
  bHostUser: '',
});

function businessViewPropainerOneReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_GETRESULT:
      return state.set('getResult', action.getResult).set('getSubmitting', false);
    case CHANGE_GETRESULTMODEL:
      return state.set('getResultModel', action.getResultModel).set('getSubmitting', false);
    case CHANGE_GETERROR:
      return state.set('getError', action.getError).set('getSubmitting', false);
    case CHANGE_GETSUBMITTING:
      return state.set('getSubmitting', action.getSubmitting);
    case CHANGE_MODELID:
      return state.set('modelId', action.modelId);
    case CHANGE_BPHOTOS:
      return state.set('bPhotos', action.bPhotos);
    case CHANGE_BSTARS:
      return state.set('bStars', action.bStars);
    case CHANGE_BPHOTOACTIVE:
      return state.set('bPhotoActive', action.bPhotoActive);
    case CHANGE_BNAME:
      return state.set('bName', action.bName);
    case CHANGE_BLOCATION:
      return state.set('bLocation', action.bLocation);
    case CHANGE_BREVIEWSCORE:
      return state.set('bReviewScore', action.bReviewScore);
    case CHANGE_BREVIEWSCOUNT:
      return state.set('bReviewsCount', action.bReviewsCount);
    case CHANGE_BREVIEWSTEXT:
      return state.set('bReviewsText', action.bReviewsText);
    case CHANGE_BAMENITIES:
      return state.set('bAmenities', action.bAmenities);
    case CHANGE_BROOMS:
      return state.set('bRooms', action.bRooms);
    case CHANGE_BOPINIONSTRONG:
      return state.set('bOpinionStrong', action.bOpinionStrong);
    case CHANGE_BOPINIONWEAK:
      return state.set('bOpinionWeak', action.bOpinionWeak);
    case CHANGE_BACTIVITIES:
      return state.set('bActivities', action.bActivities);
    case CHANGE_BHOSTUSER:
      return state.set('bHostUser', action.bHostUser);
    case BSHARE:
      alert('change this bShare');
      return state;
    case BASKQUESTION:
      alert('change this bAskQuestion');
      return state;
    case BREPORT:
      alert('change this bReport');
      return state;
    case SUBMITGET:
      return state.set('getSubmitting', true);
    case PROCESSMODEL:
      let model = state.get('getResultModel').result;
      return state.set('bName', model.name)
        .set('bLocation', model.address && model.address.address)
        .set('bStars', model.stars)
        .set('bAmenities', fromJS(model.amenities))
        .set('bPhotoActive', model.coverPhoto && model.coverPhoto.photos && model.coverPhoto.photos.photos.byId[1].data)
        .set('bRooms', model.units)
        .set('bReviewScore', model.reviewsAvg)
        .set('bReviewsCount', model.reviewsNum)
        .set('bOpinionStrong', model.opinionStrong)
        .set('bOpinionWeak', model.opinionWeak)
        .set('bActivities', model.activities);

    default:
      return state;
  }
}

export default businessViewPropainerOneReducer;
