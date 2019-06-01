/**
 *
 * BookingPropConnector
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import BookingPage from '../BookingPage/Loadable';
// import {withConnect as withConnectBU} from '../BookingPage';

import BookingPropainerOne from '../BookingProps/BookingPropainerOne/Loadable';
import { withConnect as BookingPropainerOneConnect } from '../BookingProps/BookingPropainerOne';
// import BookingPropainerTwo from '../BookingProps/BookingPropainerTwo/Loadable';
// import { withConnect as BookingPropainerTwoConnect } from '../BookingProps/BookingPropainerTwo';


/* eslint-disable react/prefer-stateless-function */
export class BookingPropConnector extends React.Component {
  render() {
    // const props
    return (
      <React.Fragment>
        <BookingPropainerOne>
          {/* <BookingPropainerTwo> */}
          <BookingPage {...this.props} />
          {/* </BookingPropainerTwo> */}
        </BookingPropainerOne>
      </React.Fragment>
    );
  }
}

BookingPropConnector.propTypes = {
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
  BookingPropainerOneConnect,
  // BookingPropainerTwoConnect,
  // withConnectBU,
)(BookingPropConnector);

export { withConnect };
