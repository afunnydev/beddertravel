import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the businessViewPage state domain
 */

const selectBusinessViewPageDomain = state =>
  state.get('businessViewPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by BusinessViewPage
 */

const makeSelectBusinessViewPage = () =>
  createSelector(selectBusinessViewPageDomain, substate => substate.toJS());

const makeSelectGetResult = () =>
  createSelector(selectBusinessViewPageDomain, state => state.get('getResult'));
const makeSelectGetResultModel = () =>
  createSelector(selectBusinessViewPageDomain, state =>
    state.get('getResultModel'),
  );
const makeSelectGetError = () =>
  createSelector(selectBusinessViewPageDomain, state => state.get('getError'));
const makeSelectGetSubmitting = () =>
  createSelector(selectBusinessViewPageDomain, state =>
    state.get('getSubmitting'),
  );
const makeSelectModelId = () =>
  createSelector(selectBusinessViewPageDomain, state => state.get('modelId'));
const makeSelectBPhotos = () =>
  createSelector(selectBusinessViewPageDomain, state => state.get('bPhotos'));
const makeSelectBStars = () =>
  createSelector(selectBusinessViewPageDomain, state => state.get('bStars'));
const makeSelectBPhotoActive = () =>
  createSelector(selectBusinessViewPageDomain, state =>
    state.get('bPhotoActive'),
  );
const makeSelectBName = () =>
  createSelector(selectBusinessViewPageDomain, state => state.get('bName'));
const makeSelectBLocation = () =>
  createSelector(selectBusinessViewPageDomain, state => state.get('bLocation'));
const makeSelectBReviewScore = () =>
  createSelector(selectBusinessViewPageDomain, state =>
    state.get('bReviewScore'),
  );
const makeSelectBReviewsCount = () =>
  createSelector(selectBusinessViewPageDomain, state =>
    state.get('bReviewsCount'),
  );
const makeSelectBReviewsText = () =>
  createSelector(selectBusinessViewPageDomain, state =>
    state.get('bReviewsText'),
  );
const makeSelectBAmenities = () =>
  createSelector(selectBusinessViewPageDomain, state =>
    state.get('bAmenities'),
  );
const makeSelectBRooms = () =>
  createSelector(selectBusinessViewPageDomain, state => state.get('bRooms'));
const makeSelectBOpinionStrong = () =>
  createSelector(selectBusinessViewPageDomain, state =>
    state.get('bOpinionStrong'),
  );
const makeSelectBOpinionWeak = () =>
  createSelector(selectBusinessViewPageDomain, state =>
    state.get('bOpinionWeak'),
  );
const makeSelectBActivities = () =>
  createSelector(selectBusinessViewPageDomain, state =>
    state.get('bActivities'),
  );
const makeSelectBHostUser = () =>
  createSelector(selectBusinessViewPageDomain, state => state.get('bHostUser'));

export default makeSelectBusinessViewPage;
export {
  selectBusinessViewPageDomain,
  makeSelectBusinessViewPage,
  makeSelectGetResult,
  makeSelectGetResultModel,
  makeSelectGetError,
  makeSelectGetSubmitting,
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
  makeSelectBOpinionStrong,
  makeSelectBOpinionWeak,
  makeSelectBActivities,
  makeSelectBHostUser,
};
