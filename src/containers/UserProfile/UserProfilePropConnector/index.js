/**
 *
 * UserProfilePropConnector
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import UserProfilePage from '../UserProfilePage/Loadable';
// import {withConnect as withConnectBU} from '../UserProfilePage';

import UserProfilePropainerOne from '../UserProfileProps/UserProfilePropainerOne/Loadable';
import { withConnect as UserProfilePropainerOneConnect } from '../UserProfileProps/UserProfilePropainerOne';
import UserProfilePropainerTwo from '../UserProfileProps/UserProfilePropainerTwo/Loadable';
import { withConnect as UserProfilePropainerTwoConnect } from '../UserProfileProps/UserProfilePropainerTwo';
import UserProfilePropainer3 from '../UserProfileProps/UserProfilePropainer3/Loadable';
import { withConnect as UserProfilePropainer3Connect } from '../UserProfileProps/UserProfilePropainer3';


/* eslint-disable react/prefer-stateless-function */
export class UserProfilePropConnector extends React.Component {
  render() {
    // const props
    return (
      <React.Fragment>
        <UserProfilePropainerOne>
          <UserProfilePropainerTwo>
            {/* <UserProfilePropainer3> */}
              <UserProfilePage {...this.props} />
            {/* </UserProfilePropainer3> */}
          </UserProfilePropainerTwo>
        </UserProfilePropainerOne>
      </React.Fragment>
        );
  }
}

UserProfilePropConnector.propTypes = {
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
  UserProfilePropainerOneConnect,
  UserProfilePropainerTwoConnect,
  // UserProfilePropainer3Connect,
  // withConnectBU,
)(UserProfilePropConnector);

export { withConnect };
