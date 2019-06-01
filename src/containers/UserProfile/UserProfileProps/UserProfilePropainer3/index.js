/**
 *
 * UserProfilePropainer3
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
  makeSelectUserProfilePropainer3,
  makeSelectSubmitting,
} from './selectors';
import {
  changeSubmittingAction,
  action1Action,
  action2Action,
} from './actions';
import { CHANGE_SUBMITTING, ACTION1, ACTION2 } from './constants';

import { mapStateToProps, mapDispatchToProps } from './mapProps';

import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
export class UserProfilePropainer3 extends React.Component {
  render() {
    return (
      /* <div style={{display: 'none'}}>
        
Submitting: <input onChange={this.props.onChangeSubmitting} value={this.props.submitting} />
        
Action1: <button onClick={this.props.action1}>TRY</button>
Action2: <button onClick={this.props.action2}>TRY</button> 
      </div> */
      <React.Fragment>{this.props.children}</React.Fragment>
    );
  }
}

UserProfilePropainer3.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'userProfilePage3', reducer });

export default compose(
  withReducer,
  withConnect,
)(UserProfilePropainer3);

export { withConnect };
