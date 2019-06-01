/**
 *
 * BusinessViewPropainerTwo
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
  makeSelectBusinessViewPropainerTwo,
  makeSelectBookedList,
  makeSelectBookResult,
  makeSelectBookError,
} from './selectors';
import {
  changeBookedListAction,
  changeBookResultAction,
  changeBookErrorAction,
  makeBookingAction,
} from './actions';
import {
  CHANGE_BOOKEDLIST,
  CHANGE_BOOKRESULT,
  CHANGE_BOOKERROR,
  MAKEBOOKING,
} from './constants';

import { mapStateToProps, mapDispatchToProps } from './mapProps';

import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
export class BusinessViewPropainerTwo extends React.Component {
  render() {
    return (
      /* <div style={{display: 'none'}}>
        
BookedList: <input onChange={this.props.onChangeBookedList} value={this.props.bookedList} />
BookResult: <input onChange={this.props.onChangeBookResult} value={this.props.bookResult} />
BookError: <input onChange={this.props.onChangeBookError} value={this.props.bookError} />
        
MakeBooking: <button onClick={this.props.makeBooking}>TRY</button> 
      </div> */
      <React.Fragment>{this.props.children}</React.Fragment>
    );
  }
}

BusinessViewPropainerTwo.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'businessViewPageTwo', reducer });

export default compose(
  withReducer,
  withConnect,
)(BusinessViewPropainerTwo);

export { withConnect };
