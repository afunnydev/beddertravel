import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';

import { mapStateToProps, mapDispatchToProps } from './mapProps';

import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
export class SearchBarRedux extends React.Component {
  render() {
    return (
      <React.Fragment />
    );
  }
}

SearchBarRedux.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'searchBar', reducer });

export default compose(
  withReducer,
  withConnect,
)(SearchBarRedux);

export { withConnect };
