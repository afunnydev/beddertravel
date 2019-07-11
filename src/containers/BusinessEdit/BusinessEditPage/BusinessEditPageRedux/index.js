import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  resetStateAction,
} from './actions';

import { mapStateToProps, mapDispatchToProps } from './mapProps';

import reducer from './reducer';
import saga from './saga';

export class BusinessEditPageRedux extends React.Component {
  componentWillUnmount() {
    this.props.dispatch(resetStateAction());
  }

  componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      this.props.onChangeModelId(this.props.match.params.id);
      this.props.submitModel(this.props.match.params.id);
    }
  }

  render() {
    return (
      <React.Fragment />
    );
  }
}

BusinessEditPageRedux.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'businessEditPageRedux', reducer });
const withSaga = injectSaga({ key: 'businessEditPageRedux', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withRouter,
)(BusinessEditPageRedux);

export { withConnect };
