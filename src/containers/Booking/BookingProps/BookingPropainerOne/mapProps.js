import { createStructuredSelector } from 'reselect';
import {
  changeGetResultAction,
  changeGetResultModelAction,
  changeGetErrorAction,
  changeGetSubmittingAction,
  changeReviewResultAction,
  changeReviewResultModelAction,
  changeReviewErrorAction,
  changeReviewSubmittingAction,
  changeModelIdAction,
  changeBPhotosAction,
  changeBStarsAction,
  changeBPhotoActiveAction,
  changeBNameAction,
  changeBLocationAction,
  changeBReviewScoreAction,
  changeBReviewsCountAction,
  changeBReviewsTextAction,
  changeBAmenitiesAction,
  changeBRoomsAction,
  changeBusinessInfoAction,
  changeBookingInfoAction,
  changeOtherInfoAction,
  changeBHostUserAction,
  bShareAction,
  bAskQuestionAction,
  bReviewMakeAction,
  bReviewSubmitAction,
  bReportAction,
  submitGetAction,
  processModelAction,
} from './actions';
import {
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
} from './selectors'; // { makeSelectBookingPropainerOne,

const mapStateToProps = createStructuredSelector({
  // bookingpropainerone: makeSelectBookingPropainerOne(),

  getResult: makeSelectGetResult(),
  getResultModel: makeSelectGetResultModel(),
  getError: makeSelectGetError(),
  getSubmitting: makeSelectGetSubmitting(),
  reviewResult: makeSelectReviewResult(),
  reviewResultModel: makeSelectReviewResultModel(),
  reviewError: makeSelectReviewError(),
  reviewSubmitting: makeSelectReviewSubmitting(),
  modelId: makeSelectModelId(),
  bPhotos: makeSelectBPhotos(),
  bStars: makeSelectBStars(),
  bPhotoActive: makeSelectBPhotoActive(),
  bName: makeSelectBName(),
  bLocation: makeSelectBLocation(),
  bReviewScore: makeSelectBReviewScore(),
  bReviewsCount: makeSelectBReviewsCount(),
  bReviewsText: makeSelectBReviewsText(),
  bAmenities: makeSelectBAmenities(),
  bRooms: makeSelectBRooms(),
  businessInfo: makeSelectBusinessInfo(),
  bookingInfo: makeSelectBookingInfo(),
  otherInfo: makeSelectOtherInfo(),
  bHostUser: makeSelectBHostUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,

    bShare: (evt) => {
      dispatch(bShareAction(evt));
    },
    bAskQuestion: (evt) => {
      dispatch(bAskQuestionAction(evt));
    },
    bReviewMake: (evt) => {
      dispatch(bReviewMakeAction(evt));
    },
    bReviewSubmit: (evt) => {
      dispatch(bReviewSubmitAction(evt));
    },
    bReport: (evt) => {
      dispatch(bReportAction(evt));
    },
    submitGet: (evt) => {
      dispatch(submitGetAction(evt));
    },
    processModel: (evt) => {
      dispatch(processModelAction(evt));
    },
    onChangeGetResult: (evt) => {
      dispatch(changeGetResultAction(evt));
    },
    onChangeGetResultModel: (evt) => {
      dispatch(changeGetResultModelAction(evt));
    },
    onChangeGetError: (evt) => {
      dispatch(changeGetErrorAction(evt));
    },
    onChangeGetSubmitting: (evt) => {
      dispatch(changeGetSubmittingAction(evt));
    },
    onChangeReviewResult: (evt) => {
      dispatch(changeReviewResultAction(evt));
    },
    onChangeReviewResultModel: (evt) => {
      dispatch(changeReviewResultModelAction(evt));
    },
    onChangeReviewError: (evt) => {
      dispatch(changeReviewErrorAction(evt));
    },
    onChangeReviewSubmitting: (evt) => {
      dispatch(changeReviewSubmittingAction(evt));
    },
    onChangeModelId: (evt) => {
      dispatch(changeModelIdAction(evt));
    },
    onChangeBPhotos: (evt) => {
      dispatch(changeBPhotosAction(evt));
    },
    onChangeBStars: (evt) => {
      dispatch(changeBStarsAction(evt));
    },
    onChangeBPhotoActive: (evt) => {
      dispatch(changeBPhotoActiveAction(evt));
    },
    onChangeBName: (evt) => {
      dispatch(changeBNameAction(evt));
    },
    onChangeBLocation: (evt) => {
      dispatch(changeBLocationAction(evt));
    },
    onChangeBReviewScore: (evt) => {
      dispatch(changeBReviewScoreAction(evt));
    },
    onChangeBReviewsCount: (evt) => {
      dispatch(changeBReviewsCountAction(evt));
    },
    onChangeBReviewsText: (evt) => {
      dispatch(changeBReviewsTextAction(evt));
    },
    onChangeBAmenities: (evt) => {
      dispatch(changeBAmenitiesAction(evt));
    },
    onChangeBRooms: (evt) => {
      dispatch(changeBRoomsAction(evt));
    },
    onChangeBusinessInfo: (evt) => {
      dispatch(changeBusinessInfoAction(evt));
    },
    onChangeBookingInfo: (evt) => {
      dispatch(changeBookingInfoAction(evt));
    },
    onChangeOtherInfo: (evt) => {
      dispatch(changeOtherInfoAction(evt));
    },
    onChangeBHostUser: (evt) => {
      dispatch(changeBHostUserAction(evt));
    },
  };
}

export { mapStateToProps, mapDispatchToProps };
