/**
 *
 * BusinessViewPropainerOne
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
  makeSelectBusinessViewPropainerOne,
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
} from './selectors';
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

import { mapStateToProps, mapDispatchToProps } from './mapProps';

import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
export class BusinessViewPropainerOne extends React.Component {
  render() {
    return (
      /* <div style={{display: 'none'}}>
        
GetResult: <input onChange={this.props.onChangeGetResult} value={this.props.getResult} />
GetResultModel: <input onChange={this.props.onChangeGetResultModel} value={this.props.getResultModel} />
GetError: <input onChange={this.props.onChangeGetError} value={this.props.getError} />
GetSubmitting: <input onChange={this.props.onChangeGetSubmitting} value={this.props.getSubmitting} />
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
BOpinionStrong: <input onChange={this.props.onChangeBOpinionStrong} value={this.props.bOpinionStrong} />
BOpinionWeak: <input onChange={this.props.onChangeBOpinionWeak} value={this.props.bOpinionWeak} />
BActivities: <input onChange={this.props.onChangeBActivities} value={this.props.bActivities} />
BHostUser: <input onChange={this.props.onChangeBHostUser} value={this.props.bHostUser} />
        
BShare: <button onClick={this.props.bShare}>TRY</button>
BAskQuestion: <button onClick={this.props.bAskQuestion}>TRY</button>
BReport: <button onClick={this.props.bReport}>TRY</button>
SubmitGet: <button onClick={this.props.submitGet}>TRY</button>
ProcessModel: <button onClick={this.props.processModel}>TRY</button> 
      </div> */
      <React.Fragment />
    );
  }
}

BusinessViewPropainerOne.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'businessViewPage', reducer });

export default compose(
  withReducer,
  withConnect,
)(BusinessViewPropainerOne);

export { withConnect };
