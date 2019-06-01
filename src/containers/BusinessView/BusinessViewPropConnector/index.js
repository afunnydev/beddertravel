/**
 *
 * BusinessViewPropConnector
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import BusinessViewPage from '../BusinessViewPage/Loadable';
// import {withConnect as withConnectBU} from '../BusinessViewPage';

import BusinessViewPropainerOne from '../BusinessViewProps/BusinessViewPropainerOne/Loadable';
import { withConnect as BusinessViewPropainerOneConnect } from '../BusinessViewProps/BusinessViewPropainerOne';
import BusinessViewPropainerTwo from '../BusinessViewProps/BusinessViewPropainerTwo/Loadable';
import { withConnect as BusinessViewPropainerTwoConnect } from '../BusinessViewProps/BusinessViewPropainerTwo';


/* eslint-disable react/prefer-stateless-function */
export class BusinessViewPropConnector extends React.Component {
  render() {
    // const props
    return (
      <React.Fragment>
        <BusinessViewPropainerOne>
          <BusinessViewPropainerTwo>
            <BusinessViewPage {...this.props} />
          </BusinessViewPropainerTwo>
        </BusinessViewPropainerOne>
      </React.Fragment>
    );
  }
}

BusinessViewPropConnector.propTypes = {
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

export default compose(
  withConnect,
  BusinessViewPropainerOneConnect,
  BusinessViewPropainerTwoConnect,
  // withConnectBU,
)(BusinessViewPropConnector);

export { withConnect };
