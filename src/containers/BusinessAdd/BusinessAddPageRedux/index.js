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

export class BusinessAddPageRedux extends React.Component {
  changeModelId(id = null) {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id &&
      this.props.match.params.id.length > 0
    ) {
      this.props.onChangeModelId(this.props.match.params.id);
      this.props.submitModel(this.props.match.params.id);
    }
  }

  processModel(model) {
    if (
      this.props.result &&
      this.props.result.result &&
      this.props.result.result.business &&
      this.props.result.result.business.id &&
      this.props.result.result.business.id > 0
    ) {
      this.props.onChangeModelId(this.props.result.result.business.id);
    }
  }

  componentWillUnmount() {
    this.props.dispatch(resetStateAction());
  }

  componentDidMount() {
    this.changeModelId();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    if (this.props.result !== prevProps.result) {
      if (
        this.props.result &&
        this.props.result.result &&
        this.props.result.result.business &&
        this.props.result.result.business.id &&
        this.props.result.result.business.id > 0
      ) {
        this.processModel(this.props.result.result.business);
        this.props.history.replace(
          `/business/${this.props.result.result.business.id}`,
        );
      }
    }

    if (this.props.modelId !== prevProps.modelId) {
      this.props.onChangeModelId(this.props.modelId);
    }

    if (this.props.modelResult !== prevProps.modelResult) {

      if (
        this.props.modelResult &&
        this.props.modelResult.result &&
        this.props.modelResult.result.business &&
        this.props.modelResult.result.business.id
      ) {
        this.processModel(this.props.modelResult);
      }
    }
  }

  render() {
    return (
      <React.Fragment />
    );
  }
}

BusinessAddPageRedux.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'businessAddPageRedux', reducer });
const withSaga = injectSaga({ key: 'businessAddPageRedux', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withRouter,
)(BusinessAddPageRedux);

export { withConnect };
