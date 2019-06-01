import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { mapStateToProps, mapDispatchToProps } from './mapProps';

import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class MyAdsPageRedux extends React.Component {
  render() {
    return (
      <React.Fragment />
    );
  }
}

MyAdsPageRedux.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'myAdsPageRedux', reducer });
const withSaga = injectSaga({ key: 'myAdsPageRedux', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MyAdsPageRedux);

export { withConnect };
