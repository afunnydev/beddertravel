/**
 *
 * BusinessViewPropainerOne
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';

import { mapStateToProps, mapDispatchToProps } from './mapProps';

import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
export class BusinessViewPropainerOne extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.children}
      </React.Fragment>
    );
  }
}

BusinessViewPropainerOne.propTypes = {
  children: PropTypes.object.isRequired,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export const withReducer = injectReducer({ key: 'businessViewPage', reducer });

export default compose(
  withReducer,
  withConnect,
)(BusinessViewPropainerOne);

export { withConnect };
