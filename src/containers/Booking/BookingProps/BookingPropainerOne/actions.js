/*
 *
 * BookingPropainerOne actions
 *
 */

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
export function changeReviewResultAction(reviewResult) {
  return {
    type: CHANGE_REVIEWRESULT,
    reviewResult,
  };
}
export function changeReviewResultModelAction(reviewResultModel) {
  return {
    type: CHANGE_REVIEWRESULTMODEL,
    reviewResultModel,
  };
}
export function changeReviewErrorAction(reviewError) {
  return {
    type: CHANGE_REVIEWERROR,
    reviewError,
  };
}
export function changeReviewSubmittingAction(reviewSubmitting) {
  return {
    type: CHANGE_REVIEWSUBMITTING,
    reviewSubmitting,
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
export function changeBusinessInfoAction(businessInfo) {
  return {
    type: CHANGE_BUSINESSINFO,
    businessInfo,
  };
}
export function changeBookingInfoAction(bookingInfo) {
  return {
    type: CHANGE_BOOKINGINFO,
    bookingInfo,
  };
}
export function changeOtherInfoAction(otherInfo) {
  return {
    type: CHANGE_OTHERINFO,
    otherInfo,
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
export function bReviewMakeAction(bReviewMake) {
  return {
    type: BREVIEWMAKE,
    bReviewMake,
  };
}
export function bReviewSubmitAction(bReviewSubmit) {
  return {
    type: BREVIEWSUBMIT,
    bReviewSubmit,
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
