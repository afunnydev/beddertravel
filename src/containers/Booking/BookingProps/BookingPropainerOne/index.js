/**
 *
 * BookingPropainerOne
 * ??????
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import {
  makeSelectBookingPropainerOne,
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
} from './selectors';
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

import { mapStateToProps, mapDispatchToProps } from './mapProps';

import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
export class BookingPropainerOne extends React.Component {
  render() {
    return (
      /* <div style={{display: 'none'}}>

GetResult: <input onChange={this.props.onChangeGetResult} value={this.props.getResult} />
GetResultModel: <input onChange={this.props.onChangeGetResultModel} value={this.props.getResultModel} />
GetError: <input onChange={this.props.onChangeGetError} value={this.props.getError} />
GetSubmitting: <input onChange={this.props.onChangeGetSubmitting} value={this.props.getSubmitting} />
ReviewResult: <input onChange={this.props.onChangeReviewResult} value={this.props.reviewResult} />
ReviewResultModel: <input onChange={this.props.onChangeReviewResultModel} value={this.props.reviewResultModel} />
ReviewError: <input onChange={this.props.onChangeReviewError} value={this.props.reviewError} />
ReviewSubmitting: <input onChange={this.props.onChangeReviewSubmitting} value={this.props.reviewSubmitting} />
ModelId: <input onChange={this.props.onChangeModelId} value={this.props.modelId} />
BPhotos: <input onChange={this.props.onChangeBPhotos} value={this.props.bPhotos} />
BStars: <input onChange={this.props.onChangeBStars} value={this.props.bStars} />
BPhotoActive: <input onChange={this.props.onChangeBPhotoActive} value={this.props.bPhotoActive} />
BName: <input onChange={this.props.onChangeBName} value={this.props.bName} />
BLocation: <input onChange={this.props.onChangeBLocation} value={this.props.bLocation} />
BReviewScore: <input onChange={this.props.onChangeBReviewScore} value={this.props.bReviewScore} />
BReviewsCount: <input onChange={this.props.onChangeBReviewsCount} value={this.props.bReviewsCount} />
BReviewsText: <input onChange={this.props.onChangeBReviewsText} value={this.props.bReviewsText} />
BAmenities: <input onChange={this.props.onChangeBAmenities} value={this.props.bAmenities} />
BRooms: <input onChange={this.props.onChangeBRooms} value={this.props.bRooms} />
BusinessInfo: <input onChange={this.props.onChangeBusinessInfo} value={this.props.businessInfo} />
BookingInfo: <input onChange={this.props.onChangeBookingInfo} value={this.props.bookingInfo} />
OtherInfo: <input onChange={this.props.onChangeOtherInfo} value={this.props.otherInfo} />
BHostUser: <input onChange={this.props.onChangeBHostUser} value={this.props.bHostUser} />

BShare: <button onClick={this.props.bShare}>TRY</button>
BAskQuestion: <button onClick={this.props.bAskQuestion}>TRY</button>
BReviewMake: <button onClick={this.props.bReviewMake}>TRY</button>
BReviewSubmit: <button onClick={this.props.bReviewSubmit}>TRY</button>
BReport: <button onClick={this.props.bReport}>TRY</button>
SubmitGet: <button onClick={this.props.submitGet}>TRY</button>
ProcessModel: <button onClick={this.props.processModel}>TRY</button>
      </div> */
      <React.Fragment>{this.props.children}</React.Fragment>
    );
  }
}

BookingPropainerOne.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'bookingPage', reducer });

export default compose(
  withReducer,
  withConnect,
)(BookingPropainerOne);

export { withConnect };
