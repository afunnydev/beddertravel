import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the bookingPage state domain
 */

const selectBookingPageDomain = state => state.get('bookingPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by BookingPage
 */

const makeSelectBookingPage = () => createSelector(selectBookingPageDomain, substate => substate.toJS());

const makeSelectGetResult = () => createSelector(selectBookingPageDomain, state => state.get('getResult'));
const makeSelectGetResultModel = () => createSelector(selectBookingPageDomain, state => state.get('getResultModel'));
const makeSelectGetError = () => createSelector(selectBookingPageDomain, state => state.get('getError'));
const makeSelectGetSubmitting = () => createSelector(selectBookingPageDomain, state => state.get('getSubmitting'));
const makeSelectReviewResult = () => createSelector(selectBookingPageDomain, state => state.get('reviewResult'));
const makeSelectReviewResultModel = () => createSelector(selectBookingPageDomain, state => state.get('reviewResultModel'), );
const makeSelectReviewError = () => createSelector(selectBookingPageDomain, state => state.get('reviewError'));
const makeSelectReviewSubmitting = () => createSelector(selectBookingPageDomain, state => state.get('reviewSubmitting'), );
const makeSelectModelId = () => createSelector(selectBookingPageDomain, state => state.get('modelId'));
const makeSelectBPhotos = () => createSelector(selectBookingPageDomain, state => state.get('bPhotos'));
const makeSelectBStars = () => createSelector(selectBookingPageDomain, state => state.get('bStars'));
const makeSelectBPhotoActive = () => createSelector(selectBookingPageDomain, state => state.get('bPhotoActive'));
const makeSelectBName = () => createSelector(selectBookingPageDomain, state => state.get('bName'));
const makeSelectBLocation = () => createSelector(selectBookingPageDomain, state => state.get('bLocation'));
const makeSelectBReviewScore = () => createSelector(selectBookingPageDomain, state => state.get('bReviewScore'));
const makeSelectBReviewsCount = () => createSelector(selectBookingPageDomain, state => state.get('bReviewsCount'));
const makeSelectBReviewsText = () => createSelector(selectBookingPageDomain, state => state.get('bReviewsText'));
const makeSelectBAmenities = () => createSelector(selectBookingPageDomain, state => state.get('bAmenities'));
const makeSelectBRooms = () => createSelector(selectBookingPageDomain, state => state.get('bRooms'));
const makeSelectBusinessInfo = () => createSelector(selectBookingPageDomain, state => state.get('businessInfo'));
const makeSelectBookingInfo = () => createSelector(selectBookingPageDomain, state => state.get('bookingInfo'));
const makeSelectOtherInfo = () => createSelector(selectBookingPageDomain, state => state.get('otherInfo'));
const makeSelectBHostUser = () => createSelector(selectBookingPageDomain, state => state.get('bHostUser'));

export default makeSelectBookingPage;
export {
  selectBookingPageDomain,
  makeSelectBookingPage,
  makeSelectGetResult,
  makeSelectGetResultModel,
  makeSelectGetError,
  makeSelectGetSubmitting,
  makeSelectReviewResult,
  makeSelectReviewResultModel,
  makeSelectReviewError,
  makeSelectReviewSubmitting,
  makeSelectModelId,
  makeSelectBPhotos,
  makeSelectBStars,
  makeSelectBPhotoActive,
  makeSelectBName,
  makeSelectBLocation,
  makeSelectBReviewScore,
  makeSelectBReviewsCount,
  makeSelectBReviewsText,
  makeSelectBAmenities,
  makeSelectBRooms,
  makeSelectBusinessInfo,
  makeSelectBookingInfo,
  makeSelectOtherInfo,
  makeSelectBHostUser,
};
