/*
 *
 * BusinessViewPropainerOne actions
 *
 */

import {
  CHANGE_GETRESULT,
  CHANGE_GETRESULTMODEL,
  CHANGE_GETERROR,
  CHANGE_GETSUBMITTING,
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

export function changeGetResultAction(getResult) {
  return {
    type: CHANGE_GETRESULT,
    getResult,
  };
}
export function changeGetResultModelAction(getResultModel) {
  return {
    type: CHANGE_GETRESULTMODEL,
    getResultModel,
  };
}
export function changeGetErrorAction(getError) {
  return {
    type: CHANGE_GETERROR,
    getError,
  };
}
export function changeGetSubmittingAction(getSubmitting) {
  return {
    type: CHANGE_GETSUBMITTING,
    getSubmitting,
  };
}
export function changeModelIdAction(modelId) {
  return {
    type: CHANGE_MODELID,
    modelId,
  };
}
export function changeBPhotosAction(bPhotos) {
  return {
    type: CHANGE_BPHOTOS,
    bPhotos,
  };
}
export function changeBStarsAction(bStars) {
  return {
    type: CHANGE_BSTARS,
    bStars,
  };
}
export function changeBPhotoActiveAction(bPhotoActive) {
  return {
    type: CHANGE_BPHOTOACTIVE,
    bPhotoActive,
  };
}
export function changeBNameAction(bName) {
  return {
    type: CHANGE_BNAME,
    bName,
  };
}
export function changeBLocationAction(bLocation) {
  return {
    type: CHANGE_BLOCATION,
    bLocation,
  };
}
export function changeBReviewScoreAction(bReviewScore) {
  return {
    type: CHANGE_BREVIEWSCORE,
    bReviewScore,
  };
}
export function changeBReviewsCountAction(bReviewsCount) {
  return {
    type: CHANGE_BREVIEWSCOUNT,
    bReviewsCount,
  };
}
export function changeBReviewsTextAction(bReviewsText) {
  return {
    type: CHANGE_BREVIEWSTEXT,
    bReviewsText,
  };
}
export function changeBAmenitiesAction(bAmenities) {
  return {
    type: CHANGE_BAMENITIES,
    bAmenities,
  };
}
export function changeBRoomsAction(bRooms) {
  return {
    type: CHANGE_BROOMS,
    bRooms,
  };
}
export function changeBOpinionStrongAction(bOpinionStrong) {
  return {
    type: CHANGE_BOPINIONSTRONG,
    bOpinionStrong,
  };
}
export function changeBOpinionWeakAction(bOpinionWeak) {
  return {
    type: CHANGE_BOPINIONWEAK,
    bOpinionWeak,
  };
}
export function changeBActivitiesAction(bActivities) {
  return {
    type: CHANGE_BACTIVITIES,
    bActivities,
  };
}
export function changeBHostUserAction(bHostUser) {
  return {
    type: CHANGE_BHOSTUSER,
    bHostUser,
  };
}
export function bShareAction(bShare) {
  return {
    type: BSHARE,
    bShare,
  };
}
export function bAskQuestionAction(bAskQuestion) {
  return {
    type: BASKQUESTION,
    bAskQuestion,
  };
}
export function bReportAction(bReport) {
  return {
    type: BREPORT,
    bReport,
  };
}
export function submitGetAction(submitGet) {
  return {
    type: SUBMITGET,
    submitGet,
  };
}
export function processModelAction(processModel) {
  return {
    type: PROCESSMODEL,
    processModel,
  };
}
