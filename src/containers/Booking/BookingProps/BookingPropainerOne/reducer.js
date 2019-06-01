/*
 *
 * BookingPropainerOne reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_GETRESULT,
  CHANGE_GETRESULTMODEL,
  CHANGE_GETERROR,
  CHANGE_GETSUBMITTING,
  CHANGE_REVIEWRESULT,
  CHANGE_REVIEWRESULTMODEL,
  CHANGE_REVIEWERROR,
  CHANGE_REVIEWSUBMITTING,
  CHANGE_MODELID,
  CHANGE_BPHOTOS,
  CHANGE_BSTARS,
  CHANGE_BPHOTOACTIVE,
  CHANGE_BNAME,
  CHANGE_BLOCATION,
  CHANGE_BREVIEWSCORE,
  CHANGE_BREVIEWSCOUNT,
  CHANGE_BREVIEWSTEXT,
  CHANGE_BAMENITIES,
  CHANGE_BROOMS,
  CHANGE_BUSINESSINFO,
  CHANGE_BOOKINGINFO,
  CHANGE_OTHERINFO,
  CHANGE_BHOSTUSER,
  BSHARE,
  BASKQUESTION,
  BREVIEWMAKE,
  BREVIEWSUBMIT,
  BREPORT,
  SUBMITGET,
  PROCESSMODEL,
} from './constants';

export const initialState = fromJS({
  getResult: '',
  getResultModel: '',
  getError: '',
  getSubmitting: '',
  reviewResult: '',
  reviewResultModel: '',
  reviewError: '',
  reviewSubmitting: '',
  modelId: '',
  bPhotos: '',
  bStars: '',
  bPhotoActive: '',
  bName: '',
  bLocation: '',
  bReviewScore: '',
  bReviewsCount: '',
  bReviewsText: '',
  bAmenities: '',
  bRooms: '',
  businessInfo: '',
  bookingInfo: '',
  otherInfo: '',
  bHostUser: '',
});

function bookingPropainerOneReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_GETRESULT:
      return state.set('getResult', action.getResult);
    case CHANGE_GETRESULTMODEL:
      return state.set('getResultModel', action.getResultModel);
    case CHANGE_GETERROR:
      return state.set('getError', action.getError);
    case CHANGE_GETSUBMITTING:
      return state.set('getSubmitting', action.getSubmitting);
    case CHANGE_REVIEWRESULT:
      return state.set('reviewResult', action.reviewResult);
    case CHANGE_REVIEWRESULTMODEL:
      return state.set('reviewResultModel', action.reviewResultModel);
    case CHANGE_REVIEWERROR:
      return state.set('reviewError', action.reviewError);
    case CHANGE_REVIEWSUBMITTING:
      return state.set('reviewSubmitting', action.reviewSubmitting);
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
    case CHANGE_BUSINESSINFO:
      return state.set('businessInfo', action.businessInfo);
    case CHANGE_BOOKINGINFO:
      return state.set('bookingInfo', action.bookingInfo);
    case CHANGE_OTHERINFO:
      return state.set('otherInfo', action.otherInfo);
    case CHANGE_BHOSTUSER:
      return state.set('bHostUser', action.bHostUser);
    case BSHARE:
      // alert('change this bShare');
      return state;
    case BASKQUESTION:
      // alert('change this bAskQuestion');
      return state;
    case BREVIEWMAKE:
      // alert('change this bReviewMake');
      return state;
    case BREVIEWSUBMIT:
      // alert('change this bReviewSubmit');
      return state;
    case BREPORT:
      // alert('change this bReport');
      return state;
    case SUBMITGET:
      // alert('change this submitGet');
      return state;
    case PROCESSMODEL:
      // alert('change this processModel');
      const model = state.get('getResultModel').result;
      // console.log('model', model);
      // bPhotos: '',
      // bPhotoActive: '',
      // bName: '',
      // bLocation: '',
      // bReviewScore: '',
      // bReviewsCount: '',
      // // bReviewsText: '',
      // bAmenities: '',
      // bRooms: '',
      // bOpinionStrong: '',
      // bOpinionWeak: '',
      // bActivities: '',
      // bHostUser: '',
      return state.set('bName', model.business.name)
        .set('bLocation', model.business.address.address)
      // set('bReviewScore', model)
      // set('bReviewsCount', model)
        .set('bStars', model.business.stars)
        .set('bAmenities', fromJS(model.business.amenities))
        .set('bPhotoActive', model.business.coverPhoto.photos.photos.byId[1].data)
        .set('bRooms', model.business.units)
        .set('bReviewScore', model.business.reviewsAvg)
        .set('bReviewsCount', model.business.reviewsNum)
        .set('bOpinionStrong', model.business.opinionStrong)
        .set('bOpinionWeak', model.business.opinionWeak)
        .set('bActivities', model.business.activities);

    default:
      return state;
  }
}

export default bookingPropainerOneReducer;
