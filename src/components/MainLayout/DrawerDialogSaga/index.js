/**
 *
 * DrawerDialogSaga
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class DrawerDialogSaga extends React.Component {
  render() {
    return <React.Fragment />;
  }
}

DrawerDialogSaga.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);
const withSaga = injectSaga({ key: 'drawerDialogSaga', saga });

export default compose(
  withSaga,
  withConnect,
)(DrawerDialogSaga);
