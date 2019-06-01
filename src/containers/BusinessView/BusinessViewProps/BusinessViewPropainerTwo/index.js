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
} from './selectors';
import { changeBookedListAction, makeBookingAction } from './actions';
import { CHANGE_BOOKEDLIST, MAKEBOOKING } from './constants';

import { mapStateToProps, mapDispatchToProps } from './mapProps';

// import {withReducer} from '../BusinessViewPropainerOne/index';

import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
export class BusinessViewPropainerTwo extends React.Component {
  render() {
    return (
      /* <div style={{display: 'none'}}>
        
BookedList: <input onChange={this.props.onChangeBookedList} value={this.props.bookedList} />
        
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
// console.log('withReducer', withReducer);

export default compose(
  withReducer,
  withConnect,
)(BusinessViewPropainerTwo);

export { withConnect };
