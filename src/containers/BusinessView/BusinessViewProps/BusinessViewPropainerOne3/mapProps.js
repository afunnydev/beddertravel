import {
  changeGetResultAction,
  changeGetResultModelAction,
  changeGetErrorAction,
  changeGetSubmittingAction,
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
  changeBOpinionStrongAction,
  changeBOpinionWeakAction,
  changeBActivitiesAction,
  changeBHostUserAction,
  bShareAction,
  bAskQuestionAction,
  bReportAction,
  submitGetAction,
  processModelAction,
} from './actions';
import {
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
} from './selectors'; //{ makeSelectBusinessViewPropainerOne,
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  //businessviewpropainerone: makeSelectBusinessViewPropainerOne(),

  getResult: makeSelectGetResult(),
  getResultModel: makeSelectGetResultModel(),
  getError: makeSelectGetError(),
  getSubmitting: makeSelectGetSubmitting(),
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
  bOpinionStrong: makeSelectBOpinionStrong(),
  bOpinionWeak: makeSelectBOpinionWeak(),
  bActivities: makeSelectBActivities(),
  bHostUser: makeSelectBHostUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,

    bShare: evt => {
      dispatch(bShareAction(evt.target.value));
    },
    bAskQuestion: evt => {
      dispatch(bAskQuestionAction(evt.target.value));
    },
    bReport: evt => {
      dispatch(bReportAction(evt.target.value));
    },
    submitGet: evt => {
      dispatch(submitGetAction(evt.target.value));
    },
    processModel: evt => {
      dispatch(processModelAction(evt.target.value));
    },
    onChangeGetResult: evt => {
      dispatch(changeGetResultAction(evt.target.value));
    },
    onChangeGetResultModel: evt => {
      dispatch(changeGetResultModelAction(evt.target.value));
    },
    onChangeGetError: evt => {
      dispatch(changeGetErrorAction(evt.target.value));
    },
    onChangeGetSubmitting: evt => {
      dispatch(changeGetSubmittingAction(evt.target.value));
    },
    onChangeModelId: evt => {
      dispatch(changeModelIdAction(evt.target.value));
    },
    onChangeBPhotos: evt => {
      dispatch(changeBPhotosAction(evt.target.value));
    },
    onChangeBStars: evt => {
      dispatch(changeBStarsAction(evt.target.value));
    },
    onChangeBPhotoActive: evt => {
      dispatch(changeBPhotoActiveAction(evt.target.value));
    },
    onChangeBName: evt => {
      dispatch(changeBNameAction(evt.target.value));
    },
    onChangeBLocation: evt => {
      dispatch(changeBLocationAction(evt.target.value));
    },
    onChangeBReviewScore: evt => {
      dispatch(changeBReviewScoreAction(evt.target.value));
    },
    onChangeBReviewsCount: evt => {
      dispatch(changeBReviewsCountAction(evt.target.value));
    },
    onChangeBReviewsText: evt => {
      dispatch(changeBReviewsTextAction(evt.target.value));
    },
    onChangeBAmenities: evt => {
      dispatch(changeBAmenitiesAction(evt.target.value));
    },
    onChangeBRooms: evt => {
      dispatch(changeBRoomsAction(evt.target.value));
    },
    onChangeBOpinionStrong: evt => {
      dispatch(changeBOpinionStrongAction(evt.target.value));
    },
    onChangeBOpinionWeak: evt => {
      dispatch(changeBOpinionWeakAction(evt.target.value));
    },
    onChangeBActivities: evt => {
      dispatch(changeBActivitiesAction(evt.target.value));
    },
    onChangeBHostUser: evt => {
      dispatch(changeBHostUserAction(evt.target.value));
    },
  };
}

export { mapStateToProps, mapDispatchToProps };
