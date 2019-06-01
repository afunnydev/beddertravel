/**
 *
 * DrawerDialogPropainer
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
  makeSelectDrawerDialogPropainer,
  makeSelectSubmitResult,
  makeSelectSubmitError,
  makeSelectSubmitting,
  makeSelectSettings,
  makeSelectChanges,
} from './selectors';
import {
  changeSubmitResultAction,
  changeSubmitErrorAction,
  changeSubmittingAction,
  changeSettingsAction,
  changeChangesAction,
  submitAction,
  processAction,
  changeAction,
} from './actions';
import {
  CHANGE_SUBMITRESULT,
  CHANGE_SUBMITERROR,
  CHANGE_SUBMITTING,
  CHANGE_SETTINGS,
  CHANGE_CHANGES,
  SUBMIT,
  PROCESS,
  CHANGE,
} from './constants';

import { mapStateToProps, mapDispatchToProps } from './mapProps';

import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
export class DrawerDialogPropainer extends React.Component {
  render() {
    return (
      /* <div style={{display: 'none'}}>
        
SubmitResult: <input onChange={this.props.onChangeSubmitResult} value={this.props.submitResult} />
SubmitError: <input onChange={this.props.onChangeSubmitError} value={this.props.submitError} />
Submitting: <input onChange={this.props.onChangeSubmitting} value={this.props.submitting} />
Settings: <input onChange={this.props.onChangeSettings} value={this.props.settings} />
Changes: <input onChange={this.props.onChangeChanges} value={this.props.changes} />
        
Submit: <button onClick={this.props.submit}>TRY</button>
Process: <button onClick={this.props.process}>TRY</button>
Change: <button onClick={this.props.change}>TRY</button> 
      </div> */
      <React.Fragment>{this.props.children}</React.Fragment>
    );
  }
}

DrawerDialogPropainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'drawerDialog', reducer });

export default compose(
  withReducer,
  withConnect,
)(DrawerDialogPropainer);

export { withConnect };
