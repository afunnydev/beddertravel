import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';

import {
  locationApplyAction,
} from './actions';

import { mapStateToProps, mapDispatchToProps } from './mapProps';

import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
export class BusinessEditGeneralInformationRedux extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    this.props.dispatch(locationApplyAction());
  }

  render() {
    return (
      <React.Fragment />
    );
  }
}

BusinessEditGeneralInformationRedux.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: 'businessEditGeneralInformationRedux',
  reducer,
});

export default compose(
  withReducer,
  withConnect,
)(BusinessEditGeneralInformationRedux);

export { withConnect };
